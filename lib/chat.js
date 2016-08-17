// Chat - Implementation of server-side chat!

const PubSub = require('./services/pubsub_service');
const SocketIO = require('socket.io');
var io;

var User = require('./chat/user');
var Message = require('./chat/message');

const Events = require('./shared/events');
const MessageService = require('./services/message_service');
const BroadcastService = require('./services/broadcast_service');

const defaultRoom = 'Everyone';
const notificationRoom = 'Notifications';
const sockets = {}

function updateUsers() {
  User.list(function(users) {
    BroadcastService.updateUsers(io, users);
  });
}

function loadRoomMessages(socket, room) {
  Message.list(room, function(room, messages) {
    BroadcastService.loadRoom(socket, messages);
  });
}

function sendMessage(room, message) {
  BroadcastService.sendMessage(io.sockets.in(room), message)
}

function privateMessageNotification(socket) {
  if(socket.room != defaultRoom) {
    var socketIds = socket.room.split(':');
    
    // remove and store the sending users id
    var fromSocketId = socketIds.splice(
      socketIds.indexOf(socket.client.conn.id), 1
    );

    var socketToNotify = sockets[socketIds[0]];

    if (socket.room != socketToNotify.room) {
      BroadcastService.sendChatNotification(socketToNotify, fromSocketId)
    }
  }
}

function joinRoom(socket, room) {
  if (socket.room) socket.leave(socket.room);
  socket.room = room;
  socket.join(room);

  loadRoomMessages(socket, room);
}

function joinPrivateRoom(socket, user_id) {
  var room = [user_id, socket.client.conn.id].sort().join(':');
  joinRoom(socket, room)
}

function joinChat(socket, username) {
  socket.username = username;
  sockets[socket.client.conn.id] = socket;

  User.create(socket.client.conn.id, username);
  updateUsers();

  joinRoom(socket, defaultRoom);
  socket.join(notificationRoom);

  BroadcastService.sendMessage(io.sockets.in(defaultRoom), MessageService.userJoinedMessage(username))
}

function leaveChat(socket) {
  User.destroy(socket.client.conn.id, updateUsers);
  BroadcastService.sendMessage(io.sockets.in(defaultRoom), MessageService.userLeftMessage(socket.username));
}

function connectToChat(socket) {
  console.log('Client connected at ' + socket.id);

  socket.on(Events.user.join, function(username) {    
    joinChat(socket, username);
    console.log(username + ' joined at ' + socket.id)
  });

  socket.on(Events.room.private, function(username) {
    // This will work until we add the concept of Rooms.
    if(username == defaultRoom) {
      joinRoom(socket, defaultRoom);
    } else {
      joinPrivateRoom(socket, username)
    }
  });
  
  socket.on(Events.message.new, function(message) {
    var new_message = MessageService.userMessage(
      socket.room,
      socket.username,
      message
    )
    
    Message.create(socket.room, new_message, sendMessage);
    privateMessageNotification(socket);
  });

  socket.on('disconnect', function() {
    if(socket.username) {
      leaveChat(socket);
      console.log(socket.username + ' left');
    }
    
    console.log(socket.id + ' disconnected');
  });
}

function init (listener, callback) {
  io = SocketIO(listener);
  io.on('connection', connectToChat);

  PubSub.init(function(sub) {
    // relay redis pubsub messages to socket.io
    sub.on("message", function (channel, message) {
      console.log(channel + " : " + message);
      io.emit(channel, message);
    });
  });
  
  setTimeout(function(){ callback() }, 300); // wait for socket
}

module.exports = {
  init: init
};
