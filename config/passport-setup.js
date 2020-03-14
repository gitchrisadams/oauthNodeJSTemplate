const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

// User for storing/retrieving user from cookie.
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            // Options for Google Strategy
            callbackURL: "/auth/google/redirect",
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        (accessToken, refreshToken, profile, done) => {
            // Save data from Google in our MongoDB:
            // Check if user exists before adding it:
            User.findOne({ googleId: profile.id }).then(currentUser => {
                if (currentUser) {
                    // Already have user
                    console.log("User is: ", currentUser);
                    done(null, currentUser);
                } else {
                    // If no user, create it in db:
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    })
                        .save()
                        .then(newUser => {
                            console.log("newUser: ", newUser);
                            done(null, newUser);
                        });
                }
            });
        }
    )
);
