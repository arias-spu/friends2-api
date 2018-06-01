// When the app starts
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var Promise = require('bluebird');

var router = require('./router.js'); 

app.set('bookshelf', router.GetBookshelf());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// elsewhere, to use the bookshelf client:
var bookshelf = app.get('bookshelf');


app.all('*', function AllRequestsHandler(request, response, next){
	console.log('Request ' + request.method + '\tof: ' + request.url + '\treceived from: ' + 
		request.connection.remoteAddress + '\t' + new Date());

	next();
});
app.use('/api', express.static('public'));
app.use('/api', router);






app.listen(3000, function() {
  console.log('Express started at port 3000');
});