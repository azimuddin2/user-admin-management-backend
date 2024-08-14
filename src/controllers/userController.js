const {
    processRegister,
    findUsers,
    findUserById,
    deleteUserById
} = require("../services/userService");
const { successResponse } = require("./responseController");

const handleProcessRegister = async (req, res, next) => {
    try {
        const newUser = await processRegister(req);

        return successResponse(res, {
            statusCode: 200,
            message: 'User was created successfully',
            payload: { newUser },
        });
    } catch (error) {
        next(error);
    }
};

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

const handleDeleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteUserById(id);

        return successResponse(res, {
            statusCode: 200,
            message: 'User was deleted successfully',
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleProcessRegister,
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById,
};