var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var csv = require('csv-to-json');
var ld = require("levenshtein-distance");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var json = csv.parse('english.csv');
// csv.write('english.json');

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
        for (var country in wordCollection) {
            if (filterCollection()) { 
                return true;
            }
        }
            return false;
    });
    response.send(word);    
});

function filterCollection(wordCollection) {
    for(var country in wordCollection) {
        var collection = wordCollection[country]
        if (wordCollection[country] == input) { 
            return true;
        } else if (filterArray()) {
            return true;
        }
    }
        return false;    
};

function filterArray(collection) {
    for(var i = 0; i < collection.length; i++) {
        if (collection[i] == input) {
            return true;
        } 
    }    
        return false;    
}



module.exports = app;
