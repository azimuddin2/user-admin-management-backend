const createError = require("http-errors");
const bcrypt = require('bcryptjs');
const User = require("../models/userModel");

const login = async (req) => {
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


    } catch (error) {
        throw error;
    }
};

module.exports = {
    login,
};