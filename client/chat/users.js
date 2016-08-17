// Users - Front end "store" for holding and listing users,
// as well as subscribing to callbacks.
//

const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

var users = {};
 
module.exports = {
  set: function(users_json) {
    users = JSON.parse(users_json);
    emitter.emit('update');
  },

  list: function() {
    return users;
  },
 
  subscribe: function(callback) {
    emitter.on('update', callback);
  },
 
  unsubscribe: function(callback) {
    emitter.off('update', callback);
  }
};
