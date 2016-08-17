// MessageService - helpers for formatting messages.
//

const messageTypes = {
  user: 'user-message',
  system: 'system-message'
}

function messageJSON(type, body, room = '', username='') {
  return JSON.stringify({
    type: type,
    room: room,
    username: username,
    body: body,
    time: new Date().getTime()
  })
}

function userMessage(room, username, body) {
  return messageJSON(messageTypes.user, body, room, username)
}

function systemMessage(body) {
  return messageJSON(messageTypes.system, body);
}

function userJoinedMessage(username) {
  return systemMessage(username + ' joined.');
}

function userLeftMessage(username) {
  return systemMessage(username + ' left.');
}

module.exports = {
  userJoinedMessage: userJoinedMessage,
  userLeftMessage: userLeftMessage,
  systemMessage: systemMessage,
  userMessage: userMessage
}