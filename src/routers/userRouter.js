const express = require('express');
const {
    handleProcessRegister,
    handleActivateAccount,
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById
} = require('../controllers/userController');
const { uploadUserImage } = require('../middlewares/uploadFile');
const userRouter = express.Router();

userRouter.post('/process-register', uploadUserImage.single("image"), handleProcessRegister);
userRouter.post('/activate', handleActivateAccount);
userRouter.get('/', handleGetUsers);
userRouter.get('/:id', handleGetUserById);
userRouter.delete('/:id', handleDeleteUserById);

module.exports = userRouter;