const mongoose = require('mongoose')
const Edu = require('../model/userEduction')
const userExperience = require('../model/userExperience')
const UserProject = require('../model/userProject')

const UserCV = new mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        status: { type: String },
        occupation: { type: String },
        image: { type: String },
        skills: {
            type: [String],
            default: [],
        },
        educations: {
            type: [Edu],
            default: [],
        },
        experience: {
            type: [userExperience,],
            default: [],
        },
        projects: {
            type: [UserProject],
            default: [],
        }
    },
    { collection: 'userCV' }
)

const model = mongoose.model('UserData', UserCV)

module.exports = model