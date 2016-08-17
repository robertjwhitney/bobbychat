// Room Header - Maintaining the title of the room the user is currently in.

var React = require('react');
 
module.exports = React.createClass({  
  render: function() {
    return <div className='room-header'>
      > <b>{this.props.title}</b>
    </div>;
  }
});
