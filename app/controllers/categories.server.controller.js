var mongoose = require('mongoose');
var Category = mongoose.model('Category');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown Server Error!';
    }
};

// GET CATEGORIES
exports.list = function (req, res) {
    // use mongoose to get all categories in the database
    Category.find().sort('category').exec(function (err, categories) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }
        res.json(categories); // return all categories in JSON format
    });
};

// CREATE Category
exports.create = function (req, res) {
    var category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;

    // save the bear and check for errors
    category.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }

        res.json({
            message: 'Category Created!',
            category: category
        });
    });

};

exports.categoryByID = function(req, res, next, id) {
    Category.findById(id).exec(function(err, category) {
        if (err) return next(err);
        if (!category) return next(new Error('Failed to load Category with ID:s ' + id));

        req.category = category;
        next();
    });
};

// READ Category
exports.read = function(req, res) {
    res.json(req.category);
};

// UPDATE Category by _ID
exports.update = function(req, res) {
    var category = req.category;

    category.name = req.body.name;
    category.description = req.body.description;

    category.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Category Updated!',
                category: category
            });
        }
    });
};

// DELETE Category by _ID
exports.delete = function(req, res) {
    var category = req.category;

    category.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json({
                message: 'Category Deleted!',
                category: category
            });
        }
    });
};

