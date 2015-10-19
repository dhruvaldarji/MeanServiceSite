var mongoose = require('mongoose');
var Site_Data = mongoose.model('Data');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown Server Error!';
    }
};

// GET SITE_DATA
exports.list = function (req, res) {
    // use mongoose to get all site_data in the database
    Site_Data.find().sort('site_data').exec(function (err, site_data) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.json(site_data); // return all site_data in JSON format
    });
};

// CREATE Site_Data
exports.create = function (req, res) {
    var site_data = new Site_Data();

    site_data.title = req.body.title;
    site_data.title_short = req.body.title_short;
    site_data.owner = req.body.owner;
    site_data.description = req.body.description;
    site_data.contact_number = req.body.contact_number;
    site_data.contact_email = req.body.contact_email;
    site_data.contact_address = req.body.contact_address;
    site_data.social = req.body.social;

    // save the bear and check for errors
    site_data.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }

        res.json({
            message: 'Site_Data Created!',
            site_data: site_data
        });
    });

};

exports.dataByID = function(req, res, next, id) {
    Site_Data.findById(id).exec(function(err, site_data) {
        if (err) return next(err);
        if (!site_data) return next(new Error('Failed to load Site_Data with ID: ' + id));

        req.site_data = site_data;
        next();
    });
};

// READ Site_Data
exports.read = function(req, res) {
    res.json(req.site_data);
};

// UPDATE Site_Data by _ID
exports.update = function(req, res) {
    var site_data = req.site_data;

    site_data.title = req.body.title;
    site_data.title_short = req.body.title_short;
    site_data.owner = req.body.owner;
    site_data.description = req.body.description;
    site_data.contact_number = req.body.contact_number;
    site_data.contact_email = req.body.contact_email;
    site_data.contact_address = req.body.contact_address;
    site_data.social = req.body.social;

    site_data.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Site_Data Updated!',
                site_data: site_data
            });
        }
    });
};

// DELETE Site_Data by _ID
exports.delete = function(req, res) {
    var site_data = req.site_data;

    site_data.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Site_Data Deleted!',
                site_data: site_data
            });
        }
    });
};

