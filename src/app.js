const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const app = express();

app.use(morgan("dev"));
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