// Message Item - Representation of a single message.

var React = require('react');
 
module.exports = React.createClass({
  render: function() {
    return <li className={this.props.type}>
      <span className='username'>{this.props.username}</span> 
      {this.props.message}
    </li>;
  }
});
