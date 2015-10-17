// app/routes.js

// grab the nerd model we just created
var User = require('./models/user.server.model.js');
var Service = require('./models/service.server.model.js');

var services = require('./controllers/services.server.controller.js');
var users = require('./controllers/users.server.controller.js');

module.exports = function (app) {

// server routes ===========================================================
// handle things like api calls
// authentication routes

    //GET API
    // test route to make sure everything is working
    // (accessed at GET http://localhost:3000/api)
    app.get('/api/', function (req, res) {
        res.json({message: 'Hooray! Welcome to our API!'});
    });

    //SERVICES CRUD ========================================================

    app.route('/api/services/')
        .get(services.list)
        .post(services.create);

    app.route('/api/services/:serviceID/')
        .get(services.read)
        .put(services.update)
        .delete(services.delete);

    app.param('serviceID', services.serviceByID);

    //==========================================================================

    // USER CRUD ===============================================================

    app.route('/api/users/')
        .get(users.list)
        .post(users.create);

    app.route('/api/users/:userID/')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('userID', users.userByID);



    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('.*', function (req, res) {
        res.sendFile('public/views/index.html'); // load our public/index.html file
    });
};