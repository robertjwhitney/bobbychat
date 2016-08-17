// User Form - Form shown when a user has not 'joined' the chat yet.
// Collects name for chatting.
//

var React = require('react');
 
module.exports = React.createClass({
  getInitialState: () => ({ name: '' }),

  updateName: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  submit: function(e) {
    e.preventDefault();
    this.props.onJoin(this.state.name);
  },

  render: function() {
    return <div className='user-form'>
      <form onSubmit={this.submit}>
        <h2>BobbyChat</h2>
        <input value={this.state.name} onChange={this.updateName} type="text" placeholder="Your Name" autoFocus required/>
        <input type="submit" value="Join" className='btn' />
      </form>
    </div>;
  }
});
