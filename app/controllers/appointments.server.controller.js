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
    Appointment.find().sort('date').exec(function (err, appts) {
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
    appt.client = req.body.client;
    appt.serviceID = req.body.serviceID;
    appt.date = req.body.date;
    appt.comments = req.body.comments;

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
        if (!appt) return next(new Error('Failed to load Appointment with ID: ' + id));

        req.appt = appt;
        next();
    });
};

exports.apptByClient = function (req, res) {
    var clientName = req.params.client;
    // use mongoose to get all appts in the database
    Appointment.find({'client': clientName }).sort('client').exec(function (err, appts) {
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

    appt.client = req.body.client;
    appt.serviceID = req.body.serviceID;
    appt.date = req.body.date;
    appt.comments = req.body.comments;

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

