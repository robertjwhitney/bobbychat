var express = require('express')
var app = express();
var server = require('http').createServer(app);
var port = (process.env.PORT || 5000);

var sass = require('node-sass-middleware');
var path = require('path');

app.use(sass({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static(__dirname + '/public'));
app.set('port', port);

if (process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({
    dumpExceptions: true, showStack: true
  }));
}

var chat = require('./lib/chat')

server.listen(port, function () {
  chat.init(server, function(){
    console.log('Server listening at port %d', port);
  });
});
