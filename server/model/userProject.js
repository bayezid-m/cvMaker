const mongoose = require('mongoose')

const UserProject = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
    },
    { collection: 'userProject' }
)

const model = mongoose.model('userProject', UserProject)

module.exports = model