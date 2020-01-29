let mongoose = require('mongoose')

let Teacher = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})

module.exports = {
    model: mongoose.model('teacher', Teacher),
    schema: Teacher
}