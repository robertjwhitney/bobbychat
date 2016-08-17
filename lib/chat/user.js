// User - Interface to creating and retrieving users

const users = {};

function create(id, name) {
  users[id] = name
  return users[id]
}

function get(id) {
  return users[id];
}

function list(callback) {
  callback(JSON.stringify(users));
}

function destroy(id, callback = function(){}) {
  delete users[id]
  callback()
}

module.exports = {
  create: create,
  list: list,
  get: get,
  destroy: destroy
};
