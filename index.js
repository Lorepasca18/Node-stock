const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


// API KEY pk_e5b2e2cbbfe4452483192b1cc258cba1
// Create call_api function  
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_e5b2e2cbbfe4452483192b1cc258cba1', { json: true }, (err, res, body) => {
        if (err) { return console.log(err);}
        if (res.statusCode === 200) {
            //console.log(body);
            finishedAPI(body);
        };

    });
};


//Set Handlebars Middleware
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');

const otherstuff = "Hello there, this is other stuff!";

//Set handlebar index GET routes
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
      res.render('home', {
      stock: doneAPI
        }); 
    }, "fb");

});

//Set handlebar index POST routes
app.post('/', function (req, res) {
    call_api(function(doneAPI)  {
        //posted_stuff = req.body.stock_ticker;
      res.render('home', {
      stock: doneAPI, 
    
        }); 
    }, req.body.stock_ticker);

});

//create about page route

app.get('/about.html', (req, res) => {
    res.render('about');
});


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));