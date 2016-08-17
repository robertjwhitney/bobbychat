var expect = require("chai").expect;
var sinon = require("sinon");

var requireSubvert = require('require-subvert')(__dirname)

requireSubvert.subvert('redis-connection', require('../../fake_redis'));
var Message = require('../../../lib/chat/message');

var testRoom = '12345';
var testMessage = 'This is a test.';

// Problem here - how to test into these callbacks?
// Name callback functions, and test the seperately?
//
describe("Chat Message", function() {
  xit("should return the room and message with the callback", function(room, message) {
    Message.create(testRoom, testMessage, function(room, message) {
      expect(room).to.equal(testRoom);
      expect(message).to.equal(testMessage);
    });
  });

  xit("should create the message", function() {
    Message.create(testRoom, testMessage, function(room, message) {
      expect(message).to.equal(testMessage);
    });
  });

  xit("should list the messages", function() {
    Message.create(testRoom, testMessage, function(room, message) {});
    Message.create(testRoom, testMessage, function(room, message) {});

    Message.list(testRoom, function(room, data) {
      expect(data.length).to.equal(2);
      expect(data[0]).to.equal(testMessage);
    });
  });

  xit("should call the callback", function() {
    var callback = sinon.spy();
    Message.create(testRoom, testMessage, callback);
    expect(callback.called).to.equal(true);
  });
});
