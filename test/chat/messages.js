var expect = require("chai").expect;
var Message = require('../../client/chat/messages');

describe("Client-side Messages", function() {
  it("adds a new message", function() {
    var msg = JSON.stringify({body: 'Some kind of test message.'});
    Message.new(msg);

    expect(Message.list()[0].body).to.equal(JSON.parse(msg).body);
  });
});