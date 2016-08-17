// Message Form - The main user input for writing and sending chats.
//

var React = require('react');
 
module.exports = React.createClass({
  getInitialState: function() {
    return {
      input: ''
    };
  },
 
  submit: function(e) {
    e.preventDefault();
    
    if(this.state.input == '') {
      return false
    } else {
      this.props.onSend(this.state.input);
    }
 
    this.setState({
      input: ''
    });
  },
 
  updateInput: function(e) {
    this.setState({ input: e.target.value });
  },

  checkForSubmit: function(e) {
    if (e.keyCode == 13) {
      this.submit(e)
    }
  },
 
  render: function() {
    return <div className='message-form'>
      <form onSubmit={this.submit}>
        <textarea id='message-field' value={this.state.input} onChange={this.updateInput} onKeyDown={this.checkForSubmit} placeholder='>' autoFocus></textarea>
        <input type="submit" value="Send" />
      </form>
    </div>;
  }
});
