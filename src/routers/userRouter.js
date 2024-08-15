const express = require('express');
const {
    handleProcessRegister,
    handleActivateAccount,
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById
} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/process-register', handleProcessRegister);
userRouter.post('/activate', handleActivateAccount);
userRouter.get('/', handleGetUsers);
userRouter.get('/:id', handleGetUserById);
userRouter.delete('/:id', handleDeleteUserById);

module.exports = userRouter;