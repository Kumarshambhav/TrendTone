const express = require('express');
const tinycolor = require('tinycolor2');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000; 

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Helper function to generate color suggestions
function getPantSuggestions(shirtColor) {
    const baseColor = tinycolor(shirtColor);

    // Generate color suggestions based on color schemes
    const complementary = baseColor.complement().toHexString();
    const analogous = baseColor.analogous().map(color => color.toHexString());
    const triadic = baseColor.triad().map(color => color.toHexString());

    // Combine unique color suggestions
    return [...new Set([complementary, ...analogous, ...triadic])];
}

// Home route
app.get('/', (req, res) => {
    res.render('index', { shirtColor: null, pantSuggestions: [] });
});

// Prediction route
app.post('/predict', (req, res) => {
    const { shirtColor } = req.body;
    const pantSuggestions = getPantSuggestions(shirtColor) || ["No suggestion available"];

    res.render('index', { shirtColor, pantSuggestions });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
