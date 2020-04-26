var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    //var userModel = require('../app/models/user.server.model');
    //var serviceModel = require('../app/models/service.server.model');

    return db;
};