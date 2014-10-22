var express = require('express');
var request = require('request');
var type;
var fishPicks;
var result;
var cookieParser= require('cookie-parser')
var session= require('express-session')
var app = express()

//app.use(bodyParser);
//npm install connect-mongo
app.use(cookieParser());

app.use(session({secret: '<mysecret>', 
                 saveUninitialized: true,
                 resave: true}));
/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'IlluminaFish' });
});

app.get('/maps', function(req, res) {
	res.render('maps');
});

app.post('/rock', function(req,res) {
		request('http://api.fishplayspokemon.com/position', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    console.log(body) // Print the google web page.
	  	var location = JSON.parse(body);
	  	var x = parseFloat(location.x);
	  	var y = parseFloat(location.y);
	    }

	  	if ((x < 25 && y < 25) || (x >= 75 && y >= 25 && y < 50) ||
	  		(x >= 50 && x < 75 && y >= 50 && y < 75) || (x >= 25 && x < 50 && y >= 75)) 
	  		{fishPicks = "The Rock and the fish called a truce.";
	  		 result = "Tie (rock vs rock)";
	  		}
	  	else if ((x >= 25 && x < 50 && y < 25) || (x < 25 && y >= 50 && y < 75) || 
	  		(x > 75 && y >= 50 && y < 75) || (x >= 50 && x < 75 && y >= 75))
	  		{fishPicks = "The Rock has drowned. Hope you are proud.";
	  		 result = "Lost (rock vs paper)"
	  		}
	  	else if ((x >= 50 && x < 75 && y < 25) || (x >= 25 && x < 50 && y >= 25 && y < 50) || 
	  		(x < 25 && y >= 50 && y < 75) || (x >= 50 && x < 75 && y > 75))
	  		 {
	  		fishPicks = "The fish was annoyed by your impudence and bitc..fish-slapped your foolishness."
	  		result = "IlluminaFish is no longer interested. Try again later."
	  	
	  		}
	  	else {
	  		fishPicks = "The Rock ate the fish. You are now being sued by animal rights activists and are now homeless."
	  		 result = "Win (rock vs scissor)"}
	type = "You picked The Rock";
	return res.redirect('/result');
})});

app.post('/paper', function(req,res) {
		request('http://api.fishplayspokemon.com/position', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    console.log(body) // Print the google web page.
	  	var location = JSON.parse(body);
	  	var x = parseFloat(location.x);
	  	var y = parseFloat(location.y);
	    }
	  	if ((x < 25 && y < 25) || (x >= 75 && y >= 25 && y < 50) ||
	  		(x >= 50 && x < 75 && y >= 50 && y < 75) || (x >= 25 && x < 50 && y >= 75)) 
	  		{fishPicks = "The fish was annoyed by your impudence and bitc..fish-slapped your foolishness.";
	  		 results = "IlluminaFish is no longer interested. Try again later.";
	  		}
	  	else if ((x >= 25 && x < 50 && y < 25) || (x < 25 && y >= 50 && y < 75) || 
	  		(x > 75 && y >= 50 && y < 75) || (x >= 50 && x < 75 && y >= 75))
	  		{fishPicks = "You killed the fish with toilet paper. Because logic be damned.";
	  		 results = "Win (paper against rock)!";
	  		}
	  	else if ((x >= 50 && x < 75 && y < 25) || (x >= 25 && x < 50 && y >= 25 && y < 50) || 
	  		(x < 25 && y >= 50 && y < 75) || (x >= 50 && x < 75 && y > 75))
	  		{fishPicks = "The fish appreciates your toilet paper."
	  		results = "Tie (paper against paper)"
	  		}
	  	else 
	  		{fishPicks = "Did you really just throw toilet paper at a fish? Really?";
	  		 result = "Lost (paper against scissor)";
	  	}
	type = "You picked Toilet Paper.";
	return res.redirect('/result');
})});

app.post('/scissor', function(req,res) {
		request('http://api.fishplayspokemon.com/position', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    console.log(body) // Print the google web page.
	  	var location = JSON.parse(body);
	  	var x = parseFloat(location.x);
	  	var y = parseFloat(location.y);
	    }
	  	if ((x < 25 && y < 25) || (x >= 75 && y >= 25 && y < 50) ||
	  		(x >= 50 && x < 75 && y >= 50 && y < 75) || (x >= 25 && x < 50 && y >= 75)) 
	  		{fishPicks = "The fish was annoyed by your impudence and bitc..fish-slapped your foolishness.";
	  		 results = "IlluminaFish is no longer interested. Try again later.";
	  		}
	  	else if ((x >= 25 && x < 50 && y < 25) || (x < 25 && y >= 50 && y < 75) || 
	  		(x > 75 && y >= 50 && y < 75) || (x >= 50 && x < 75 && y >= 75))
	  		{fishPicks = "Scizor can't go underwater and fish can't fight on land."
	  		reult = "Tie (scissor vs scissor)";
	  		}
	  	else if ((x >= 50 && x < 75 && y < 25) || (x >= 25 && x < 50 && y >= 25 && y < 50) || 
	  		(x < 25 && y >= 50 && y < 75) || (x >= 50 && x < 75 && y > 75))
	  		{fishPicks = "Fish used splash! It was highly uneffective."
	  		result ="Win (scissor vs paper)";
	  	}
	  	else {fishPicks = "The fish turned The Rock against your Scizor who is now dead."
	  		  result = "Lost (scissor vs rock)";
	  	}
	type = "You picked Scizor";
	return res.redirect('/result');
})});
app.get('/result', function(req,res) {
	res.render('newpage', {title: type, option: fishPicks, result: result});
});

app.post('/location', function(req,res){
	return res.redirect('/maps')
})

app.post('/playagain', function(req,res){
	return res.redirect('/');
});

module.exports = app;
