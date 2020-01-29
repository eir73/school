const mongoose = require('mongoose')
const StudentSchema = require('./StudentModel.js').schema
const TeacherSchema = require('./TeacherModel.js').schema

const Group = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    students: {
        type: [StudentSchema],
        default: [],
        maxlength: 30,
        required: true
    },
    teacher: {
        type: TeacherSchema,
        required: true
    }
})


module.exports = {
    model: mongoose.model('Group', Group),
    schema: Group
}