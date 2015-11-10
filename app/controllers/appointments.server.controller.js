var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

var getErrorMessage = function (err) {
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
    // use mongoose to get all appts in the database
    Appointment.find().sort('category').exec(function (err, appts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.json(appts); // return all appts in JSON format
    });
};

// CREATE Appointment
exports.create = function (req, res) {
    var appt = new Appointment();
    appt.name = req.body.name;
    appt.category = req.body.category;
    appt.price = req.body.price;
    appt.description = req.body.description;
    appt.duration = req.body.duration;

    // save the appt and check for errors
    appt.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }

        res.json({
            message: 'Appointment Created!',
            appt: appt
        });
    });

};

exports.apptByID = function (req, res, next, id) {
    Appointment.findById(id).exec(function (err, appt) {
        if (err) return next(err);
        if (!appt) return next(new Error('Failed to load Appointment with ID:s ' + id));

        req.appt = appt;
        next();
    });
};

exports.apptByCategory = function (req, res) {
    var id = req.params.ID;
    // use mongoose to get all appts in the database
    Appointment.find({'category': id }).sort('name').exec(function (err, appts) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        // return all appts in JSON format
        res.json(appts);
    });
};

// READ Appointment
exports.read = function (req, res) {
    res.json(req.appt);
};

// UPDATE Appointment by _ID
exports.update = function (req, res) {
    var appt = req.appt;

    appt.name = req.body.name;
    appt.category = req.body.category;
    appt.price = req.body.price;
    appt.description = req.body.description;
    appt.duration = req.body.duration;

    appt.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Appointment Updated!',
                appt: appt
            });
        }
    });
};

// DELETE Appointment by _ID
exports.delete = function (req, res) {
    var appt = req.appt;

    appt.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Appointment Deleted!',
                appt: appt
            });
        }
    });
};

