const createError = require("http-errors");
const data = require("../data");
const User = require("../models/userModel");

const seedUsers = async (req, res, next) => {
    try {
        await User.deleteMany({});

        const users = await User.insertMany(data.users);

        if (!users) {
            throw createError(
                401,
                'Seed users for testing was not successfully'
            )
        }

        return res.status(201).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = { seedUsers };