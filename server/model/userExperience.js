const mongoose = require('mongoose')

const userExperience = new mongoose.Schema(
	{
		email: { type: String, required: true},
		title: { type: String, required: true },
		description: { type: String },
        farm: {type: String},
		starting: {type: String},
        ending: {type: String}
	},
	{ collection: 'userExperience' }
)

const model = mongoose.model('userExperience', userExperience)

module.exports = model