var express = require('express');
var crypto = require('crypto');
var User = require('../models/User');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  console.log(req.query);
//  res.render('index', { title: 'Main Page' });
//});

router.get('/', function (req, res) {
	 var env = {
	    title: 'main page',
	    user: req.session.user,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
	  }
	  console.log("env: " + env);
	  res.render('index', env);
});

router.get('/reg', function (req, res) {
	  res.render('reg', {
	    title: 'Registration',
	    user: req.session.user,
	    success: req.flash('success').toString(),
	    error: req.flash('error').toString()
	  });
});
router.post('/reg', function(req, res, next) {
  console.log(req.body);
  var name = req.body.name;
  
  var name = req.body.name,
  password = req.body.password,
  password_re = req.body['password-repeat'];
  
  if (password_re != password) {
	  req.flash('error', 'two passwords are not the same!'); 
	  return res.redirect('/reg');
  }

  User.get(name, function(err, user) {
	if (err) {
		//alert(err);
		req.flash('error', err); 
		return res.redirect("/reg");
	} else {
		if (user) {
			alert(user.name + " found, cannot be duplicated");
			req.flash('error', err);
			return res.redirect("/reg");
		} else {
			var user = new User({
				username: req.body.name,
				password: req.body.password, 
				email: req.body.email
			});
			user.save(function(err, u) {
				if (err) {
					alert(err + ", user: " + u[0].username);
					req.flash('error', err);
					return res.redirect("/reg");
				}
				console.log(u[0].username + " has been saved");
				req.session.user = u[0];
				req.flash('success', "registration for user '" + u[0].username+ "' sucessfully")
				return res.redirect("/reg");
			});
		}
	}
  });
});

router.get('/post', function(req, res, next) {
  console.log(req.query);
  res.render('post', { title: 'Post' });
});
router.post('/post', function(req, res, next) {
  console.log(req.body);
});

router.get('/login', function(req, res, next) {
	res.render('login', {
		title: 'login',
		user: req.session.user,
		error: req.flash('error').toString(),
		success: req.flash('success').toString()
	});
});
router.post('/login', function(req, res, next) {
	
	if (req.body.name.trim().length == 0 || req.body.password.trim().length == 0) {
		req.flash('error', "Invalid username/password; empty");
	} else {
		User.get(req.body.name, function(err, user){
			if (err) {
				req.flash('error', err);
			}
			if (user) {
				if (user.password != req.body.password) {
					req.flash('error', "Invalid username/password; wrong password");
					return res.redirect('/login');
				}
				
				req.session.user = user;
				req.flash('success', "Login Successfully");
				return res.redirect('/');
				

			} else {
				req.flash('error', "Invalid username/password; not found");
				return res.redirect('/login');
			}
		});
	}
});

router.get('/logout', function(req, res, next) {
  console.log("logout user: "  + req.session.user.username);
  req.session.user = null;
  req.flash("success", "Logout successfully");
  res.redirect("/");
});

module.exports = router;
