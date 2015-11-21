// app/models/service.server.model.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
	"id" : { type : Schema.ObjectId, default : Schema.ObjectId	},
	"client" : {type : String, required: true	},
	"serviceID" : {type: String, required: true	},
	"date" : {type: Date, default: Date.now(), required: true	},
	"comments": {type: String	}

});

// define our services model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Appointment', AppointmentSchema);
