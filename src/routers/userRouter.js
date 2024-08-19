const express = require('express');
const {
    handleProcessRegister,
    handleActivateAccount,
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
    handleManageUserStatusById
} = require('../controllers/userController');
const { uploadUserImage } = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const { isLoggedOut, isLoggedIn, isAdmin } = require('../middlewares/auth');
const userRouter = express.Router();

userRouter.post(
    '/process-register',
    uploadUserImage.single("image"),
    validateUserRegistration,
    runValidation,
    isLoggedOut,
    handleProcessRegister
);
userRouter.post(
    '/activate',
    isLoggedOut,
    handleActivateAccount
);
userRouter.get(
    '/',
    isLoggedIn,
    isAdmin,
    handleGetUsers
);
userRouter.get(
    '/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    handleGetUserById
);
userRouter.delete(
    '/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    isAdmin,
    handleDeleteUserById
);
userRouter.put(
    '/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    uploadUserImage.single("image"),
    handleUpdateUserById
);
userRouter.put(
    '/manage-user/:id([0-9a-fA-F]{24})',
    isLoggedIn,
    isAdmin,
    handleManageUserStatusById,
);

module.exports = userRouter;