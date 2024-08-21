const express = require('express');
const {
    handleLogin,
    handleLogout,
    handleRefreshToken
} = require('../controllers/authController');
const { isLoggedOut, isLoggedIn } = require('../middlewares/auth');
const { validateUserLogin } = require('../validators/auth');
const runValidation = require('../validators');
const authRouter = express.Router();

authRouter.post(
    '/login',
    validateUserLogin,
    runValidation,
    isLoggedOut,
    handleLogin
);
authRouter.post('/logout', isLoggedIn, handleLogout);
authRouter.get('/refresh-token', handleRefreshToken);

module.exports = authRouter;