const createError = require("http-errors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtAccessKey, jwtRefreshKey } = require("../secret");
const { successResponse } = require("./responseController");
const { setAccessTokenCookie, setRefreshTokenCookie } = require("../helper/cookie");

const handleLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const filter = { email: email };

        const user = await User.findOne(filter);
        if (!user) {
            throw createError(
                404,
                'User does not exist with this email. Please register first',
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw createError(
                401,
                'Password did not match'
            )
        }

        if (user.isBanned === true) {
            throw createError(
                403,
                'You are account banned. Please contact authority'
            );
        }

        const accessToken = createJsonWebToken(
            { user },
            jwtAccessKey,
            '30m'
        );
        setAccessTokenCookie(res, accessToken);

        const refreshToken = createJsonWebToken(
            { user },
            jwtRefreshKey,
            '7d'
        );
        setRefreshTokenCookie(res, refreshToken);

        return successResponse(res, {
            statusCode: 200,
            message: 'User login successfully',
        });
    } catch (error) {
        next(error);
    }
};

const handleLogout = (req, res, next) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return successResponse(res, {
            statusCode: 200,
            message: 'User logout successfully',
        });
    } catch (error) {
        next(error);
    }
};

const handleRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        const decodedToken = jwt.verify(refreshToken, jwtRefreshKey);
        if (!decodedToken) {
            createError(
                401,
                'Invalid refresh token. Please login again'
            );
        }

        const accessToken = createJsonWebToken(
            decodedToken.user,
            jwtAccessKey,
            '30m'
        );
        setAccessTokenCookie(res, accessToken);

        return successResponse(res, {
            statusCode: 200,
            message: 'New access token is generated',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLogin,
    handleLogout,
    handleRefreshToken,
};