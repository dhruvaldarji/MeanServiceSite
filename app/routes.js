// app/routes.js

// grab the nerd model we just created
var User = require('./models/user.server.model.js');
var Service = require('./models/service.server.model.js');

module.exports = function (app) {

// server routes ===========================================================
// handle things like api calls
// authentication routes

    //GET API
    // test route to make sure everything is working
    // (accessed at GET http://localhost:3000/api)
    app.get('/api', function (req, res) {
        res.json({message: 'Hooray! Welcome to our API!'});
    });

    //SERVICES CRUD ========================================================

    // GET SERVICES
    app.get('/api/services', function (req, res) {
        // use mongoose to get all services in the database
        Service.find(function (err, services) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(services); // return all services in JSON format
        });
    });

    // POST Service
    app.post('/api/services', function (req, res) {

        var service = new Service();
        service.name = req.body.name;
        service.category = req.body.category;
        service.price = req.body.price;
        service.description = req.body.description;
        service.duration = req.body.duration;

        // save the bear and check for errors
        service.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Service Created!'});
        });

    });

    // GET Service by _ID
    app.get('/api/services/:service_id', function (req, res) {
        // use mongoose to get specific services in the database
        Service.findById(req.params.service_id, function(err, services) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(services); // return all services in JSON format
        });
    });

    //UPDATE Service by _ID
    app.put('/api/services/:service_id', function (req, res) {
        // use mongoose to get specific services in the database
        Service.findById(req.params.service_id, function(err, service) {

            if (err)
                res.send(err);

            service.name = req.body.name;
            service.category = req.body.category;
            service.price = req.body.price;
            service.description = req.body.description;
            service.duration = req.body.duration;

            // save the bear
            service.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Service Updated!' });
            });
        });
    });

    //UPDATE Service by _ID
    app.delete('/api/services/:service_id', function (req, res) {
        // use mongoose to get specific services in the database
        Service.remove({_id: req.params.service_id
        }, function(err, service) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully Deleted' });
        });
    });

    //==========================================================================

    // USER CRUD ===============================================================

    // GET Users
    app.get('/api/users', function (req, res) {
        // use mongoose to get all users in the database
        User.find(function (err, users) {

            // if there is an error retrieving, send the error.
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(users); // return all users in JSON format
        });
    });

    // POST User
    app.post('/api/users', function (req, res) {

        var user = new User();
        user.name = req.body.name;

        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'User Created!'});
        });

    });



    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });


};