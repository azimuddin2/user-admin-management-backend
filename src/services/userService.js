const createError = require("http-errors");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const { deleteImage } = require("../helper/deleteImage");
const { createJsonWebToken } = require("../helper/jsonWebToken");
const { jwtActivationKey } = require("../secret");

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

        return { payload, token };

    } catch (error) {
        throw error;
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
    findUsers,
    findUserById,
    deleteUserById,
};