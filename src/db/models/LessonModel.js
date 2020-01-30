let mongoose = require('mongoose')
let Teacher = require('./TeacherModel')
let Lesson = new mongoose.Schema({
    
    theme: {
        type: String,
        required: true
    },
    teacher: Teacher.schema,
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
