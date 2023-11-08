const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		first_name: { type: String },
		last_name: { type: String},
		email: { type: String, required: true, unique: true},
		password: { type: String, required: true },
		status: { type: String },
        occupation: {type: String},
        image: {type: String},	
		skill: [{

		}]
	},
	{ collection: 'socailusers' }
)

const model = mongoose.model('UserData', User)

module.exports = model