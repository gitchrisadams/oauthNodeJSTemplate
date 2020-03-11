const express = require("express");
const authRoutes = require("./routes/auth-routes");
const app = express();

// Setup view engine:
app.set("view engine", "ejs");

// Setup routes:
app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("app is listening on port 3000");
});

// Route for home page route:
app.get("/", (req, res) => {
    res.render("home");
});
