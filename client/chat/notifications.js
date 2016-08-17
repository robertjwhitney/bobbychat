// Notifications - Front end for subscribing to notification callbacks.
//

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
 
module.exports = {
  new: function(user_id) {
    emitter.emit('update', user_id);
  },

  subscribe: function(callback) {
    emitter.on('update', callback);
  },
 
  unsubscribe: function(callback) {
    emitter.off('update', callback);
  }
}
