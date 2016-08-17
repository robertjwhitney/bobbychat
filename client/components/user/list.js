// User List - Renders a list of users, used for the chat sidebar.

var React = require('react');
var UserItem = require('./item');
 
module.exports = React.createClass({
  render: function() {
    var cb = this.props.onUserClick;
    var usersHash = this.props.users
    var users = Object.keys(usersHash).map(function(key) {
      var username = usersHash[key];
      return <UserItem onClick={cb} key={key} id={key} user={username} />;
    });
 
    return <div className='users'>
      <div className='header'>Chat with:</div>
      <ul>
        <UserItem onClick={cb} id='Everyone' user='Everyone' />
        {users}
      </ul>
    </div>;
  }
});
