const { login } = require("../services/authService");
const { successResponse } = require("./responseController");

const handleLogin = async (req, res, next) => {
    try {
        await login(req);

        return successResponse(res, {
            statusCode: 200,
            message: 'User login successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleLogin,
};