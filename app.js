const express = require("express");
const authRoutes = require("./routes/auth-routes");
const app = express();
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");

// Setup view engine:
app.set("view engine", "ejs");

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

app.listen(3000, () => {
    console.log("app is listening on port 3000");
});

// Route for home page route:
app.get("/", (req, res) => {
    res.render("home");
});
