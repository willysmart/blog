/**
 * http://usejsdoc.org/
 */
var should = require('should');
 
var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};
 
describe("test value", function() {
	it("test", function() {
		user.should.have.property('name', 'tj');
	});
});

//user.should.have.property('pets').with.lengthOf(4);
