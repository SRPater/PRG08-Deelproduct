var express = require('express')
var app = express()

app.use(express.static('dist'));

app.listen(8080, function () {
  console.log('Now serving the game at *:8080')
})