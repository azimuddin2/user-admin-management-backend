const express = require('express');
const { handleGetUsers, handleGetUserById } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/', handleGetUsers);
userRouter.get('/:id', handleGetUserById);

module.exports = userRouter;