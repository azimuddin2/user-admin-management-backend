const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 15,
    message: 'Too many requests from this IP. Please try again later',
});

app.use(rateLimiter);
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send({
        message: 'API testing is working fine'
    })
});

app.get('/', (req, res) => {
    res.send({
        message: 'User & Admin Management Server App Running.'
    });
});

// client error handling
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});

// server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});


module.exports = app;