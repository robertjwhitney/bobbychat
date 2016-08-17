// Chat - Main React component. Manage state for other
// components, and some misc DOM behaviors.
//

var React = require('react');

var Connection = require('./connection');

var User = require('./chat/users');
var Message = require('./chat/messages');
var Notification = require('./chat/notifications');

var RoomHeader = require('./components/room/header');
var MessageForm = require('./components/message/form');
var MessageList = require('./components/message/list');
var UserForm = require('./components/user/form');
var UserList = require('./components/user/list');

function focusMessageBox() {
  document.getElementById('message-field').focus();
}

function scrollToRecentMessage() {
  var messageDiv = document.getElementById("messages");
  messageDiv.scrollTop = messageDiv.scrollHeight;
}

window.onkeydown = function(e) {
  var target = e.target;
  if (target.tagName.toUpperCase() == 'INPUT') return;
  if (target.tagName.toUpperCase() == 'TEXTAREA') return;
  focusMessageBox()
}
 
module.exports = React.createClass({
  getInitialState: function() {
    return {
      users: User.list(),
      messages: Message.list(),
      connected: Connection.isConnected,
      joined: false,
      room: 'Everyone'
    };
  },

  componentWillMount: function() {
    Message.subscribe(this.updateMessages);
    Connection.onMessage(Message.new);

    User.subscribe(this.updateUsers);
    Connection.onJoin(User.set);

    Message.subscribe(this.switchRoom);
    Connection.onSwitchRoom(Message.load);

    Notification.subscribe(this.notify);
    Connection.onNotification(Notification.new);
  },

  componentWillUnmount: function() {
    Message.unsubscribe(this.updateMessages);
    User.unsubscribe(this.updateUsers);
    Message.unsubscribe(this.switchRoom);
    Notification.unsubscribe(this.notify);
  },

  updateUsers: function() {
    this.setState({
      users: User.list()
    });
  },

  updateMessages: function() {
    this.setState({
      messages: Message.list()
    });

    scrollToRecentMessage();
  },

  onSend: function(message) {
    Connection.sendMessage(message);
  },

  onJoin: function(name) {
    Connection.join(name);
    
    this.setState({
      joined: true
    });
  },

  onUserClick: function(e) {
    e.preventDefault();
    var userId = e.target.dataset.id;
    var room = e.target.dataset.room;

    Connection.privateRoom(userId);

    this.setState({
      room: room
    });

    e.target.className -= 'notice';
  },

  notify: function(user_id) {
    var querySelector = "[data-id='" + user_id + "']"
    var chatListItem = document.querySelectorAll(querySelector)[0];
    chatListItem.className = 'notice';
  },

  switchRoom: function(room) {
    focusMessageBox()
  },

  render: function() {
    if(this.state.joined) {
      return <div className='chat'>
        <UserList onUserClick={this.onUserClick} users={this.state.users} />
        <div className='content'>
          <RoomHeader title={this.state.room} />
          <MessageList messages={this.state.messages} />
          <MessageForm
            onSend={this.onSend} 
          />
        </div>
      </div>;
    } else {
      return <UserForm
        connected={this.state.connected}
        onJoin={this.onJoin}
      />;
    }
  }
});
