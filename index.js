
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


/*
// API KEY pk_138be20ab85d47619223bd237b4fd511
// create call_api function
function call_api(finishedAPI, ticker) {
	request('wss://stream.binance.com:9443' + ticker + '************', { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI(body);
		};
	});
};
*/

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "mmmmmmmmmmm";

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, "BTCUSDT");
		
});

// Set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//console.log(doneAPI);
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);
		
});


// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));

var LimitOrder = require('limit-order-book').LimitOrder
var LimitOrderBook = require('limit-order-book').LimitOrderBook
 
let order1 = new LimitOrder("order01", "bid", 13.37, 10)
let order2 = new LimitOrder("order02", "ask", 13.38, 10)
let order3 = new LimitOrder("order03", "bid", 13.38, 5)
 
let book = new LimitOrderBook()
 
let result = book.add(order1)
result = book.add(order2)
result = book.add(order3)
 
console.log(result)
