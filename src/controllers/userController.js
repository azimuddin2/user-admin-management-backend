const {
    processRegister,
    activateAccount,
    findUsers,
    findUserById,
    deleteUserById,
    updateUserById,
    manageUserStatusById,
    updateUserPassword,
    forgetPassword,
    resetPassword
} = require("../services/userService");
const { successResponse } = require("./responseController");

const handleProcessRegister = async (req, res, next) => {
    try {
        const { payload, token } = await processRegister(req);

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your ${payload.email} for completing your registration process`,
            payload: { token },
        });
    } catch (error) {
        next(error);
    }
};

const handleActivateAccount = async (req, res, next) => {
    try {
        const newUser = await activateAccount(req);

        return successResponse(res, {
            statusCode: 201,
            message: 'User was registered successfully',
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

const handleUpdateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await updateUserById(id, req);

        return successResponse(res, {
            statusCode: 200,
            message: 'User was updated successfully',
            payload: { updatedUser },
        });
    } catch (error) {
        next(error);
    }
};

const handleManageUserStatusById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const action = req.body.action;

        const { updatedUser, successMessage } = await manageUserStatusById(id, action);

        return successResponse(res, {
            statusCode: 200,
            message: successMessage,
            payload: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

const handleUpdatePassword = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await updateUserPassword(id, req);

        return successResponse(res, {
            statusCode: 200,
            message: 'User was password updated successfully',
            payload: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

const handleForgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const token = await forgetPassword(email);

        return successResponse(res, {
            statusCode: 200,
            message: `Please go to your ${email} for reset the password`,
            payload: token,
        });
    } catch (error) {
        next(error);
    }
};

const handleResetPassword = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        await resetPassword(token, password);

        return successResponse(res, {
            statusCode: 200,
            message: 'Password reset successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleProcessRegister,
    handleActivateAccount,
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleManageUserStatusById,
    handleUpdatePassword,
    handleForgetPassword,
    handleResetPassword,
};