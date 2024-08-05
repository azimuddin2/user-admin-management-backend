const { findUsers, findUserById } = require("../services/userService");
const { successResponse } = require("./responseController");

const handleGetUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 4;

        const { users, pagination } = await findUsers(search, page, limit);

        return successResponse(res, {
            statusCode: 200,
            message: 'Users ware returned successfully',
            payload: {
                users,
                pagination,
            },
        });
    } catch (error) {
        next(error);
    }
};

const handleGetUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await findUserById(id);

        return successResponse(res, {
            statusCode: 200,
            message: 'User ware returned successfully',
            payload: { user },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleGetUsers,
    handleGetUserById,
};