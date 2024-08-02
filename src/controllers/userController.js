const data = require("../data");

const handleGetUsers = (req, res, next) => {
    try {
        res.json({
            message: 'Users ware returned successfully',
            users: data.users
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleGetUsers
};