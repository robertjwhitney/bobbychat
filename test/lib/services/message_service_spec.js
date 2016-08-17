var expect = require("chai").expect;
var sinon = require("sinon");

var MessageService = require('../../../lib/services/message_service');

function testMessageIsReturned(message) {
  expect(message).to.not.equal(undefined);
  expect(message).to.not.equal(null);
  expect(message.length).to.be.above(1);
}

describe("MessageService", function() {
  it("returns a user message", function(){
    var message = MessageService.userMessage('someroom', 'some username', 'some test message');
    testMessageIsReturned(message);
  });

  it("returns a system message", function(){
    var message = MessageService.systemMessage('some test message');
    testMessageIsReturned(message);
  });

  it("returns a user joined message", function(){
    var message = MessageService.userJoinedMessage('Bob');
    testMessageIsReturned(message);
  });

  it("returns a user left message", function(){
    var message = MessageService.userLeftMessage('Bob');
    testMessageIsReturned(message);
  });
});