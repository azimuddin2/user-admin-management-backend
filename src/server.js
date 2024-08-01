const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

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
    res.status(404).json({ message: 'route not found' });
    next();
});

// server error handling
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message,
    });
});


app.listen(port, () => {
    console.log(`server is running at http://localhost:5000`);
});