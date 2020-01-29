let mongoose = require('mongoose')
let TeacherSchema = require('./TeacherModel').schema
let Lesson = new mongoose.Schema({
    theme: {
        type: String,
        required: true
    },
    teacher: {
        type: TeacherSchema,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    classroom: {
        type: Number,
        unique: true,
        required: true
    }
})

module.exports = {
    model: mongoose.model('Lesson', Lesson),
    schema: Lesson
}