// Messages - Front end "store" for holding and listing messages,
// as well as subscribing to callbacks.
//

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
 
var recentMessages = [];
 
module.exports = {
  new: function(message) {
    recentMessages.push(JSON.parse(message));
    emitter.emit('update');
  },
  
  list: function() {
    return recentMessages.concat();
  },

  load: function(room, messages) {
    if(messages.length > 0) {
      recentMessages = messages.map(function(message) {
        return JSON.parse(message);
      });
    } else {
      recentMessages = [];
    }

    emitter.emit('update', room);
  },

  subscribe: function(callback) {
    emitter.on('update', callback);
  },
 
  unsubscribe: function(callback) {
    emitter.off('update', callback);
  }
};
