var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var csv = require('csv-to-json');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var json = csv.parse('english.csv');
csv.write('english.json');

app.get('/', function(request, response) {
    response.sendfile('./views/index.html');
});

app.get('/api', function(request, response) {
    Words = response.sendfile('english.json');
});

app.get("/api/words/:word", function(request, response) {
    var words = require('./english.json');
    
    word = words.filter(function(wordCollection){ 
        for (var country in wordCollection){
            if (wordCollection[country] == request.params.word){ return true;}
        }
        return false
    })

    response.send(word);
});

module.exports = app;
