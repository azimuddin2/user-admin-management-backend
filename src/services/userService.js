const createError = require("http-errors");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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

module.exports = {
    findUsers,
    findUserById,
};