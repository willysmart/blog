/**
 * test bluebird
 */

/////////////////////////////////////////////////
var should = require('should');
var fs = require('fs');

var filename = __filename;
 
describe("check testBluebird.js", function() {
	fs.readFile(filename, "utf-8", function(err, data) {
		if (err) {
			throw err;
		}
//		console.log(data);
		it("test fs.readFile() data not null", function(data) {
			data.length.should.be.aboveOrEqual(0);
		});
	})
});
/////////////////////////////////////////////////
