const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const ccxt = require ('./ccxt/ccxt.js')
    , id = 'binance'
    , exchange = new ccxt[id] ({ enableRateLimit: true })
    , symbol = 'BTCUSDT'

;(async function main () {

    await exchange.loadMarkets ()

    for (let i = 0; i < 2000; i++) {

        const orderbook = await exchange.fetchOrderBook (symbol)
        console.log (new Date (), i, symbol, orderbook.asks[0], orderbook.bids[0])
    }

}) ()


























/* -------------------------------------------Handlebars-------------------------------------------------- */




// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


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

