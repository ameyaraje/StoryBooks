const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

// Passport Config
require('./config/passport')(passport);
// Load routes
const auth = require('./routes/auth');

app.get('/', (req, res) => {
    res.send('it works');
});

app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
