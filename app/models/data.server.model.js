// app/models/category.server.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SocialSchema = new Schema({
    "twitter": {type: String},
    "youtube": {type: String},
    "instagram": {type: String},
    "pinterest": {type: String}
});

module.exports = mongoose.model('Social', SocialSchema);

var DataSchema = new Schema({
    "id": {type: Schema.ObjectId, default: Schema.ObjectId},
    "title": {type: String, default: 'MEAN Service Site', required: true},
    "title_short": {type: String, default: 'MEAN', required: true},
    "owner": {type: String, default: 'Owner Name', required: true},
    "description": {type: String, default: 'This is the description of the site.', required: true},
    "short_descriptions": {type: Array, required: false},
    "contact_number": {type: String, default: '0001112222', required: false},
    "contact_email": {type: String, default: 'admin@site.domain', required: true},
    "contact_address": {type: String, required: false},
    "social": {
        "twitter": {type: String},
        "youtube": {type: String},
        "instagram": {type: String},
        "pinterest": {type: String}
    }
});


// define our services model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Data', DataSchema);