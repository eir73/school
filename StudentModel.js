let mongoose = require('mongoose')


let Student = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    group: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
})
 
module.exports = {
    model: mongoose.model('Student', Student),
    schema: Student
}