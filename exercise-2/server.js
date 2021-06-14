var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + "/index.html");
});


app.listen(3001, function () {
  console.log('listening on port 3001!');

});

