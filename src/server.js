var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var url = 'mongodb://admin:admin1@ds151059.mlab.com:51059/questions_database';
var app = express();

app.get('/', (req, res) => {
  res.send('Hey Elijah')
});

app.post('/insert', function (req, res) {

  res.redirect('/');
  mongoose.connect(url, function (err, db) {
    var item  = {'test':'test'};
    db.collection('test-data').insertOne(item, function () {
      console.log('inserted');
      db.close();
    })
  })
});


app.listen(3000, ()=> console.log('data base running on localhost:3000'))
