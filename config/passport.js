const googleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(
        new googleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accesToken, refreshToken, profile, done) => {
            const photo = profile.photos[0];
            const image = photo.value.substring(0, photo.value.indexOf('?'));

            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: image
            };
            // console.log(accesToken);
            // console.log(profile);

            // Check for existing user
            User.findOne({
                googleID: profile.id
            }).then(user => {
                if (user) { // User exists
                    done(null, user);
                } else { // Create new user
                    new User(newUser)
                        .save()
                        .then(user => done(null, user));
                }
            });
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
    });
    
};