
const TeacherSchema = require('./TeacherModel.js').schema
const LessonSchema = require('./LessonModel.js').schema
const StudentSchema = require('./StudentModel.js').schema

const mongoose = require('mongoose')

const School = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    groups: {
        type: [String],
        default: [],
        maxlength: 100,
    },
    teachers: {
        type: [TeacherSchema],
        default: [],
        maxlength: 50,
    },
    lessons: {
        type: [LessonSchema],
        default: [],
        maxlength: 50
    },
    students: {
        type: [StudentSchema],
        default: [],
        maxlength: 2500
    }
})


module.exports = {
    model: mongoose.model('school', School),
    schema: School
}