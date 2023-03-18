const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const hbs = require('express-handlebars');
const path = require('path');
const PORT = process.env.PORT || 5000;

//Set Handlebars Middleware
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Set handlebar routes
app.get('/', (req, res, next) => {
    res.render('home', {layout: false});
});

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));