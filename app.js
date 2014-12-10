var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var csv = require('csv-to-json');
var ld = require("levenshtein-distance");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var json = csv.parse('english.csv');
csv.write('english.json');

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
            if (wordCollection[country] == input) { 
                return true;
            }        
        return false;
    }
    response.send(word);
    });    
});



module.exports = app;
