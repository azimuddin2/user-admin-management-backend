const express = require('express');
const {
    handleGetUsers,
    handleGetUserById,
    handleDeleteUserById
} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/', handleGetUsers);
userRouter.get('/:id', handleGetUserById);
userRouter.delete('/:id', handleDeleteUserById);

module.exports = userRouter;