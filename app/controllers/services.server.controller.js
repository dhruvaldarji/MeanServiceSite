var Service = require('mongoose').model('Service');

exports.create = function(req, res, next) {
    var service = new Service(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.json(service);
        }
    });
};