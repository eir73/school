let mongoose = require('mongoose')

let Student = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false
    },
    group: {
        type: String,
        required: true
    }
})
 
module.exports = {
    model: mongoose.model('Student', Student),
    schema: Student
}