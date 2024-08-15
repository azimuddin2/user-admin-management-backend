const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require("../models/userModel");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtActivationKey, clientURL } = require("../secret");
const sendEmail = require("../helper/sendEmail");

const processRegister = async (req) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const image = req.file?.path;

        const userExists = await User.exists({ email: email });
        if (userExists) {
            throw createError(
                409,
                'User with this email already exists. Please sign in',
            );
        }

        const payload = {
            name,
            email,
            password,
            phone,
            address,
        };

        const token = createJsonWebToken(
            payload,
            jwtActivationKey,
            '10m'
        );

        // prepare email
        const emailData = {
            email,
            subject: 'Account Activation Email',
            html: `
                <h2> Hello ${name}! </h2>
                <p>Please click here to <a href="${clientURL}/api/users/activate/${token}" target="_blank"> active your account </a> </p>
            `,
        };
        sendEmail(emailData);

        return { payload, token };
    } catch (error) {
        throw error;
    }
};

const activateAccount = async (req) => {
    try {
        const token = req.body.token;
        if (!token) {
            throw createError(
                404,
                'token not found',
            );
        }

        const decoded = jwt.verify(token, jwtActivationKey);
        if (!decoded) {
            throw createError(
                401,
                'Unable to verify user',
            );
        }

        const userExists = await User.exists({ email: decoded.email });
        if (userExists) {
            throw createError(
                409,
                'User with this email already exists. Please sign in',
            );
        }

        const newUser = await User.create(decoded);

        return newUser;

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw createError(401, 'Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw createError(401, 'Invalid token');
        } else {
            throw error;
        }
    }
};

const findUsers = async (search, page, limit) => {
    try {
        const searchRegExp = new RegExp(".*" + search + ".*", "i");
        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phone: { $regex: searchRegExp } },
            ],
        };

        const options = { password: 0 };

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        const count = await User.find(filter).countDocuments();

        if (!users || users.length === 0) {
            throw createError(
                404,
                'Users not found'
            )
        }

        return {
            users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            },
        };
    } catch (error) {
        throw error;
    }
};

const findUserById = async (id) => {
    try {
        const options = { password: 0 };

        const user = await User.findById(id, options);
        if (!user) {
            throw createError(
                404,
                'User does not exist with this id',
            );
        }

        return user;
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            throw createError(400, 'Invalid User Id');
        }
        throw error;
    }
};

const deleteUserById = async (id) => {
    try {
        const options = { password: 0 };
        const user = await findUserById(id, options);

        const result = await User.findByIdAndDelete({
            _id: id,
            isAdmin: false,
        });

        if (user && user.image) {
            await deleteImage(user.image)
        }

        if (!result) {
            throw createError(
                401,
                'User with this ID was not deleted successfully',
            );
        }

    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            throw createError(400, 'Invalid User ID');
        }
        throw error;
    }
};

module.exports = {
    processRegister,
    activateAccount,
    findUsers,
    findUserById,
    deleteUserById,
};