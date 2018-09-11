const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');

// Load user model
require('./models/User');

// Passport Config
require('./config/passport')(passport);
// Load routes
const auth = require('./routes/auth');

// Load Keys
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose.connect(keys.mongoURI, {
    useMongoClient: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('it works');
});

app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
