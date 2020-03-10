const express = require('express');
const app = express();

// Setup view engine:
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('app is listening on port 3000');
});

// Route for home page route:
app.get('/', (req, res) => {
    res.render('home');
});
