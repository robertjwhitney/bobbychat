// Message List - Representing a list of message items.
//

var React = require('react');
var MessageItem = require('./item');
 
module.exports = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function(message, i) {
      return <MessageItem key={i} type={message.type} username={message.username} message={message.body} />;
    });
 
    return <div id='messages' className='messages'>
      <ul>{messages}</ul>
    </div>;
  }
});
