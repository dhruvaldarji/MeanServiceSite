var mongoose = require('mongoose');
var Service = mongoose.model('Service');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown Server Error!';
    }
};

// GET SERVICES
exports.list = function (req, res) {
    // use mongoose to get all services in the database
    Service.find().sort('category').exec(function (err, services) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.json(services); // return all services in JSON format
    });
};

// CREATE Service
exports.create = function (req, res) {
    var service = new Service();
    service.name = req.body.name;
    service.category = req.body.category;
    service.price = req.body.price;
    service.description = req.body.description;
    service.duration = req.body.duration;

    // save the bear and check for errors
    service.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }

        res.json({
            message: 'Service Created!',
            service: service
        });
    });

};

exports.serviceByID = function(req, res, next, id) {
    Service.findById(id).exec(function(err, service) {
        if (err) return next(err);
        if (!service) return next(new Error('Failed to load Service with ID:s ' + id));

        req.service = service;
        next();
    });
};

// READ Service
exports.read = function(req, res) {
    res.json(req.service);
};

// UPDATE Service by _ID
exports.update = function(req, res) {
    var service = req.service;

    service.name = req.body.name;
    service.category = req.body.category;
    service.price = req.body.price;
    service.description = req.body.description;
    service.duration = req.body.duration;

    service.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Service Updated!',
                service: service
            });
        }
    });
};

// DELETE Service by _ID
exports.delete = function(req, res) {
    var service = req.service;

    service.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Service Deleted!',
                service: service
            });
        }
    });
};

