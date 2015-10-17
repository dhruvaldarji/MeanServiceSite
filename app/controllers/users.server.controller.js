var mongoose = require('mongoose');
var User = mongoose.model('User');

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
    // use mongoose to get all users in the database
    User.find().sort('category').exec(function (err, users) {

        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.json(users); // return all users in JSON format
    });
};

// CREATE User
exports.create = function (req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.displayName = req.body.displayName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.profileImageURL = req.body.profileImageURL;
    user.provider = req.body.provider;
    user.providerData = req.body.providerData;
    user.additionalProvidersData = req.body.additionalProvidersData;
    user.roles = req.body.roles;

    // save the bear and check for errors
    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }

        res.json({
            message: 'User Created!',
            user: user
        });
    });

};

exports.userByID = function(req, res, next, id) {
    User.findById(id).exec(function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User with ID:s ' + id));

        req.user = user;
        next();
    });
};

// READ User
exports.read = function(req, res) {
    res.json(req.user);
};

// UPDATE User by _ID
exports.update = function(req, res) {
    var user = req.user;

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.displayName = req.body.displayName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = req.body.password;
    user.profileImageURL = req.body.profileImageURL;
    user.provider = req.body.provider;
    user.providerData = req.body.providerData;
    user.additionalProvidersData = req.body.additionalProvidersData;
    user.roles = req.body.roles;

    user.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'User Updated!',
                user: user
            });
        }
    });
};

// DELETE User by _ID
exports.delete = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'User Deleted!',
                user: user
            });
        }
    });
};
