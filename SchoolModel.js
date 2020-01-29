
const TeacherSchema = require('./TeacherModel.js').schema
const LessonSchema = require('./LessonModel.js').schema

const mongoose = require('mongoose')

const School = new mongoose.Schema({
    name: {
        type: Number,
        required: true
    },
    groups: {
        type: [String],
        maxlength: 100,
        required: true
    },
    teachers: {
        type: [TeacherSchema],
        maxlength: 50,
        required: true
    },
    lessons: {
        type: [LessonSchema],
        required: true,
        maxlength: 50
    }
})