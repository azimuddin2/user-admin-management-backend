const User = require("../models/userModel");
const { findUsers } = require("../services/userService");

const handleGetUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 4;

        const { users, pagination } = await findUsers(search, page, limit);

        res.json({
            message: 'Users ware returned successfully',
            users: users,
            pagination: pagination,
        })

    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleGetUsers
};