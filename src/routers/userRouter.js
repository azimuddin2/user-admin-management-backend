const express = require('express');
const {
    handleProcessRegister,
    handleActivateAccount,
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById
} = require('../controllers/userController');
const { uploadUserImage } = require('../middlewares/uploadFile');
const { validateUserRegistration } = require('../validators/auth');
const runValidation = require('../validators');
const userRouter = express.Router();

userRouter.post(
    '/process-register',
    uploadUserImage.single("image"),
    validateUserRegistration,
    runValidation,
    handleProcessRegister
);
userRouter.post('/activate', handleActivateAccount);
userRouter.get('/', handleGetUsers);
userRouter.get('/:id', handleGetUserById);
userRouter.delete('/:id', handleDeleteUserById);

module.exports = userRouter;