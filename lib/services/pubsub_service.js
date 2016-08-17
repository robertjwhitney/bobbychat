// PubSub Service - Initialize Pub/Sub via redis. Actually not being used right
// now, but eventually, should be able to move a number of events into redis
// callbacks...
//

const pub = require('redis-connection')();
const sub = require('redis-connection')('subscriber');

function init(callback) {
  pub.on("ready", function () {
    sub.on("ready", function () {
      // Pass sub to callback, in order to take some action when messages 
      // come in. Such as setting up a relay to send messages to socket.io 
      callback(sub);
    });
  });
}

module.exports = {
  init: init
};
