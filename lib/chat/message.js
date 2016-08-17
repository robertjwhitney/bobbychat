// Message - Interface to storing and retrieving messages

const redis = require('redis-connection')();

function create(room, message, callback) {
  redis.RPUSH(room, message, function() {
    callback(room, message);
  });
}

function list(room, callback) {  
  redis.lrange(room, 0, -1, function (err, data) {
    callback(room, data);
  });
}

module.exports = {
  create: create,
  list: list
};
