var expect = require("chai").expect;
var sinon = require("sinon");

var BroadcastService = require('../../../lib/services/broadcast_service');

// Broadcast server emits events, set up 
var server = require('socket.io').listen(5000);

// so we can listen for any event
var middleware = require('socketio-wildcard')();
server.use(middleware);

var client = require('socket.io-client');
var socketURL = 'http://0.0.0.0:5000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};

var message = 'This is a test message';

describe("BroadcastService", function() {
  xit("sends the user update event", function() {
    server.sockets.on('connection', function (socket) {
      socket.on('*', function(data) {
        // Lost in callback hell here again
        expect(data).to.equal(message)
      });
    });

    client.connect(socketURL, options);
    client.connect(socketURL, options);

    BroadcastService.updateUsers(server.sockets, message);
  });
});
