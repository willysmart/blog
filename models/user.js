var mongodb = require('./db');
function User(user) {
	this.username = user.username;
	this.password = user.password;
	this.email = user.email;
}
User.prototype.save = function(callback) {
	var user = new User({
		username: this.username,
		password: this.password, 
		email: this.email
	});
	mongodb.open(function(err, db) {
		if (err) {
			mongodb.close();
			console.log(err);
			return callback(err);
		}
		db.collection("users", function(err, collection) {
			if (err) {
				console.log(err);
				return callback(err);
			}
			collection.insert(user, {safe: true}, function(err, user) {
				if (err) {
					mongodb.close();
					console.log(err);
					return callback(err);
				}
				callback(null, user);
			});
		});
		
	});
};
	  
User.get = function(name, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			console.log(err);
			return callback(err);
		}
		db.collection("users", function(err, collection) {
			if (err) {
				mongodb.close();
				console.log(err);
				return callback(err);
			}
			collection.findOne({username:name}, function(err, user) {	mongodb.close();
				if (err) {
					console.log(err);
					return callback(err);
				}
				callback(null, user);
			});
		});
	});
}

module.exports = User;