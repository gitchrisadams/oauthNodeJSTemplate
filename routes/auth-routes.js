const router = require("express").Router();

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
router.get("/google", (req, res) => {
    // Todo: handle with passport.
    res.send("Logging in w/ Google");
});

module.exports = router;
