var expect = require("chai").expect;
var User;

var id = '1';
var name = 'Bob';

describe("Chat user", function() {
  beforeEach(function() {
    User = require('../../../lib/chat/user');
  });

  it("should create a new user", function() {    var results;    
    var result = User.create(id, name);

    expect(result).to.equal(name);
  });

  it("should retrieve the user", function() {
    User.create(id, name);
    var result = User.get(id);

    expect(result).to.equal(name);
  });

  it("should return all the users", function() {
    var result;
    User.create(id, name);
    User.create('2', 'Ted');
    
    User.list(function(users) {
      result = users;
    });

    var resultObject = JSON.parse(result);

    expect(Object.keys(resultObject).length).to.equal(2)
    expect(resultObject).to.have.a.property('1', 'Bob');
  })

  it("should delete the user", function() {
    var result;
    User.create(id, name);
    User.destroy(id);

    expect(User.get(id)).to.equal(undefined);
  });
});
