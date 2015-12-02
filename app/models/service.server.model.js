// app/models/service.server.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
	"id" : { type : Schema.ObjectId, default : Schema.ObjectId	},
	"name" : {type : String, default: 'Service_Name', required: true	},
	"category" : {type : String, default: 'Service_Category', required: true	},
	"price": {type: Number, min: 0, default: 10.00, required: true	},
	"description": {type: String, default: 'Service_Description', required: true	},
	"duration": {type: Number, min: 0, default: 1.00, required: false	},
	"image": {  data: Buffer, contentType: String, required: false	}
});

// define our services model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Service', ServiceSchema);
