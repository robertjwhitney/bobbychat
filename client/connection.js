// Connection
// Manages communication between the client and socket.io
//

var socket = require('socket.io-client')();
const Events = require('../lib/shared/events');

module.exports = {
  isConnected: function() {
    return socket.connected;
  },
  
  join: function(userName) {
    socket.emit(Events.user.join, userName);
  },

  onJoin: function(callback) {
    socket.on(Events.user.update, callback);
  },

  privateRoom: function(userName) {
    socket.emit(Events.room.private, userName)
  },

  onSwitchRoom: function(callback) {
    socket.on(Events.room.load, callback)
  },

  sendMessage: function(message) {
    socket.emit(Events.message.new, message);
  },

  onMessage: function(callback) {
    socket.on(Events.message.create, callback);
  },

  onNotification: function(callback) {
    socket.on(Events.room.notify, callback);
  }
};
