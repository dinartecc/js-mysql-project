const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'b7282d3c829f44',
    password : '49ad92bf',
    database : 'heroku_8e679e6d32fb43a'
})

connection.connect();

app.get('/', function(req, res) {
    connection.query('select * from owo', function (err, rows, fields) {
      if (err) {
        console.log('error:', err);
        throw err;
      }
      res.send(['owo', rows])
    })
    // res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});
