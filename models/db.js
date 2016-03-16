//var settings = require("../settings");
//var mongodb = require("mongodb");
//module.exports = new mongodb.Db(settings.db, new mongodb.Server(settings.host, settings.port), {safe: true});

var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});