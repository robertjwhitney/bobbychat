// User Item - A single user.

var React = require('react');
 
module.exports = React.createClass({  
  render: function() {
    return <li>
      <a href='#' data-id={this.props.id} data-room={this.props.user} onClick={this.props.onClick}>
        {this.props.user}
      </a>
    </li>;
  }
});
