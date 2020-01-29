const express = require("express")

const router = express.Router()
const School = require('../db/models/SchoolModel.js').model
const Teacher = require('../db/models/TeacherModel.js').model
const Group = require('../db/models/GroupModel.js').model
const Student = require('../db/models/StudentModel.js').model


router.get("/", (req, res) => {
    res.send("we are in school")
})

router.get("/groups", (req, res) => {
    res.send("Here are our groups:")
})

router.get("/teachers", (req, res) => {
    res.send("teachers")
})

router.get('/students', (req, res) => {
    res.send('All students: ')
})

router.post("/", (req, res) => {
    
} )

router.post('/students', (req, res) => {
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        group: req.body.group
    })
    
    student.save()
        .then( data => {
        res.json(data)
    })
        .catch(err => {
        res.json({message: err})
    })
})


module.exports = router