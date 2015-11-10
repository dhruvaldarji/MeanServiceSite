// app/routes.js

var Data = require('./models/data.server.model.js');
var Category = require('./models/category.server.model.js');
var Service = require('./models/service.server.model.js');
var Appointment = require('./models/appointment.server.model.js');
var User = require('./models/user.server.model.js');

var site_data = require('./controllers/site_data.server.controller.js');
var categories = require('./controllers/categories.server.controller.js');
var services = require('./controllers/services.server.controller.js');
var appointments = require('./controllers/appointments.server.controller.js');
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

    //ABOUT CRUD ========================================================

    app.route('/api/data/')
        .get(site_data.list)
        .post(site_data.create);

    app.route('/api/data/:dataID/')
        .get(site_data.read)
        .put(site_data.update)
        .delete(site_data.delete);

    app.param('dataID', site_data.dataByID);

    //==========================================================================

    //CATEGORIES CRUD ========================================================

    app.route('/api/categories/')
        .get(categories.list)
        .post(categories.create);

    app.route('/api/categories/:categoryID/')
        .get(categories.read)
        .put(categories.update)
        .delete(categories.delete);

    app.param('categoryID', categories.categoryByID);

    //==========================================================================

    //SERVICES CRUD ========================================================

    app.route('/api/services/')
        .get(services.list)
        .post(services.create);

    app.route('/api/services/:serviceID/')
        .get(services.read)
        .put(services.update)
        .delete(services.delete);

    app.route('/api/services/category/:ID/')
        .get(services.serviceByCategory);

    app.param('serviceID', services.serviceByID);

    //==========================================================================

    //APPOINTMENTS CRUD ========================================================

    app.route('/api/appointments/')
        .get(appointments.list)
        .post(appointments.create);

    app.route('/api/appointments/:apptID/')
        .get(appointments.read)
        .put(appointments.update)
        .delete(appointments.delete);

    app.param('apptID', appointments.apptByCategory);

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
    app.get("/*", function(req, res) {
        res.sendFile("index.html", {"root": "public"});
    });
};