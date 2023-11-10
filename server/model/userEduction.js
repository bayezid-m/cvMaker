const mongoose = require('mongoose')

const Edu = new mongoose.Schema(
    {
        email: { type: String, required: true},
        institution: {type: String, required: true},
        degree: {type: String, required: true},
        gpa: {type: Number},
        starting: {type: String},
        ending: {type: String}
    },
	{ collection: 'userEducation' }
)

const model = mongoose.model('userEducation', Edu)

module.exports = model