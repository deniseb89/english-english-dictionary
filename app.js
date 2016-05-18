var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var csv = require('csv-to-json');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var json = csv.parse('english.csv');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(request, response) {
    response.sendfile('./views/index.html');
});

app.get('/api/words', function(request, response) {
    response.sendfile('english.json');
});

app.get('/api/words/random', function(request, response) {
    var words = require('./english.json');
    var randomWord = words[(Math.floor(Math.random() * words.length) + 1)];
    response.send(randomWord);
});

app.get("/api/words/:word", function(request, response) {
    var words = require('./english.json');
    var input = request.params.word;
    word = words.filter(function(wordCollection) { 
        for(var country in wordCollection) {
            var translation = wordCollection[country];
            if (input == translation) { 
                return true;
            }
        }    
        return false;
    });
    response.send(word);    
});



module.exports = app;
