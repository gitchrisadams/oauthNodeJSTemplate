const express = require("express");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const app = express();
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

// Setup view engine:
app.set("view engine", "ejs");

// Encrypting cookie before sending to browser.
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    })
);

// Initialize passport:
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB:
mongoose.connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to mongodb");
    }
);

// Setup routes:
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(3000, () => {
    console.log("app is listening on port 3000");
});

// Route for home page route:
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});
