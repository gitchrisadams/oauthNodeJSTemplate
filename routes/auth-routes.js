const router = require("express").Router();
const passport = require("passport");

// Auth Login:
router.get("/login", (req, res) => {
    res.render("login");
});

// Auth Logout:
router.get("/logout", (req, res) => {
    // Todo: Handle with passport.
    res.send("Logging out...");
});

// Auth with Google:
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);

// Google Auth Redirect callback:
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("You reached the callback URI");
});

module.exports = router;
