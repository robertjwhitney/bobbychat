// Broadcast Service - Handlers for emitting events to sockets.
//

const Events = require('../shared/events');

function updateUsers(sockets, users) {
  sockets.emit(Events.user.update, users);
}

function loadRoom(socket, messages) {
  socket.emit(Events.room.load, socket.room, messages);
}

function sendMessage(sockets, message) {
  if(sockets) {
    sockets.emit(Events.message.create, message)
  }
}

function sendChatNotification(toSocket, fromSocketId) {
  toSocket.emit(Events.room.notify, fromSocketId);
}

module.exports = {
  updateUsers: updateUsers,
  loadRoom: loadRoom,
  sendMessage: sendMessage,
  sendChatNotification: sendChatNotification
}