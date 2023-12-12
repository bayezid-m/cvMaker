const mongoose = require('mongoose')

const UserCV = new mongoose.Schema(
    {
        email: { type: String, required: true },
        image: { type: String, required: true  },
    },
    { collection: 'userCV' }
)

const model = mongoose.model('UserCV', UserCV)

module.exports = model