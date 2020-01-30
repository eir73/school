let mongoose = require('mongoose')

let Teacher = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 25,
        max: 80
    },
    work_exp: {
        type: Number,
        required: true,
        min: 2,
        max: 20
    }
})

module.exports = {
    model: mongoose.model('teacher', Teacher),
    schema: Teacher
}