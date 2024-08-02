const express = require('express');
const { handleGetUsers } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/', handleGetUsers);

module.exports = userRouter;