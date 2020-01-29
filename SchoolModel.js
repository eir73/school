const GroupSchema = require('./GroupModel.js').schema
const TeacherSchema = require('./TeacherModel.js').schema

const mongoose = require('mongoose')

const School = new mongoose.Schema({
    name: {
        type: Number,
        required: true
    },
    groups: {
        type: [GroupSchema],
        maxlength: 100,
        required: true
    },
    teachers: {
        type: [TeacherSchema],
        maxlength: 50,
        required: true
    }
})