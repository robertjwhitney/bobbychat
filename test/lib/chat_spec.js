var expect = require("chai").expect;

var dir     = __dirname.split('/')[__dirname.split('/').length-1];
var file    = dir + __filename.replace(__dirname, '') + " -> ";

// var server   = require('../../server.js');
// var chat     = require('../../lib/chat');

// var ioclient = require('socket.io-client');

describe("Socket.io connection", function() {
  var message = "Welcome to the jungle.";

  var options = {
    method  : "GET",
    url     : "/"
  }


})