const createError = require("http-errors");
const bcrypt = require('bcryptjs');
const User = require("../models/userModel");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtAccessKey } = require("../secret");
const { successResponse } = require("./responseController");

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

        res.cookie('accessToken', accessToken, {
            maxAge: 30 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });

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

        return successResponse(res, {
            statusCode: 200,
            message: 'User logout successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLogin,
    handleLogout,
};