var express = require('express')
var app = express()

app.use(express.static('dist'));

app.listen(8000, function () {
  console.log('Now serving the game at *:8000')
})