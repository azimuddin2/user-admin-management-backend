const { body } = require('express-validator');

const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage('Name is required. Enter your full name')
        .isLength({ min: 3, max: 31 })
        .withMessage('Name should be at least 3-30 characters long'),

    body("email")
        .trim()
        .notEmpty()
        .withMessage('Email is required. Enter your email address')
        .isEmail()
        .withMessage('Invalid email address'),

    body("password")
        .trim()
        .notEmpty()
        .withMessage('Password is required. Enter your password')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password should contain at least one uppercase latter, one lowercase latter, one number, and one special character.'),

    body("address")
        .trim()
        .notEmpty()
        .withMessage('Address is required. Enter your address')
        .isLength({ min: 3 })
        .withMessage('Address should be at least 3 characters long'),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone is required. Enter your phone number"),

    body("image")
        .optional()
        .isString()
        .withMessage('User image is optional'),
];

const validateUserLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage('Email is required. Enter your email address')
        .isEmail()
        .withMessage('Invalid email address'),

    body("password")
        .trim()
        .notEmpty()
        .withMessage('Password is required. Enter your password')
        .isLength({ min: 6 })
        .withMessage('Password should be at least 6 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password should contain at least one uppercase latter, one lowercase latter, one number, and one special character.'),
];

const validateUserPasswordUpdate = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage('Email is required. Enter your email address')
        .isEmail()
        .withMessage('Invalid email address'),

    body("oldPassword")
        .trim()
        .notEmpty()
        .withMessage('Old password is required. Enter your old password')
        .isLength({ min: 6 })
        .withMessage('Old password should be at least 6 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password should contain at least one uppercase latter, one lowercase latter, one number, and one special character.'),

    body("newPassword")
        .trim()
        .notEmpty()
        .withMessage('New password is required. Enter your new password')
        .isLength({ min: 6 })
        .withMessage('New password should be at least 6 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .withMessage('Password should contain at least one uppercase latter, one lowercase latter, one number, and one special character.'),

    body("confirmedPassword")
        .trim()
        .notEmpty()
        .withMessage('Confirmed password is required. Enter your confirmed password')
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("New password and confirmed password did not match")
            }
            return true;
        }),
];

const validateUserForgetPassword = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage('Email is required. Enter your email address')
        .isEmail()
        .withMessage('Invalid email address'),
];

module.exports = {
    validateUserRegistration,
    validateUserLogin,
    validateUserPasswordUpdate,
    validateUserForgetPassword,
};