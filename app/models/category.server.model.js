// app/models/category.server.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
	"id" : { type : Schema.ObjectId, default : Schema.ObjectId	},
	"name" : {type : String, required: true	},
	"description": {type: String, required: true	},
	"services": {type: Array }
});

// define our services model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Category', CategorySchema);
