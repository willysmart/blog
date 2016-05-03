/**
 * http://usejsdoc.org/
 */
var should = require('should');
 
var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};
 
describe("check test.js", function() {
	it("test: user.pets.length.should.be.equal(4)", function() {
//		should(user.pets.length).be.equal(4);
		user.pets.length.should.be.equal(4);
	});

	it("test: user.should.have.property('name')", function() {
		user.should.have.property('name', 'tj');
	});
});

//user.should.have.property('pets').with.lengthOf(4);
