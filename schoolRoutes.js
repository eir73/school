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
    res.send("All teachers: ")
    Teacher.find().then(data => {
        res.json(data)
    })
})

router.post('/teachers', (req,res) => {
    const teacher = new Teacher({
        name: req.body.name,
        age: req.body.age,
        work_exp: req.body.work_exp
    })
    
    Teacher.findOne({
        name: teacher.name,
        age: teacher.age,
        work_exp: teacher.work_exp
    }, (err, result) => {
        if(err) throw err;
        if(!result) {
            teacher.save()
                .then(data => {
                    res.send("Welcome to our school, !")
            })
        }
        else {
            res.send("This teacher has already exist")
        }
    })
    
    
})

router.get('/students', (req, res) => {
    Student.find().then(students => {
        res.json(students)
    })
})

router.post("/", (req, res) => {
    //...
} )

router.post('/students', (req, res) => {
    const student = new Student({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            age: req.body.age,
            rating: req.body.rating,
            group: req.body.group
    })

    Student.findOne({
        first_name: student.first_name,
        last_name: student.last_name,
        age: student.age,
        group: student.group,
        rating: student.rating
    }, (err, result) => {
        if(err) throw err;
        if(!result){
            student.save()
                .then(data => {
                    res.send(data.first_name + 'welcome to our school!')
                })
        }
        else {
            res.send("This student has already exist")
        }
    })
})


router.delete("/students", (req, res) => {
    Student.findByIdAndDelete(req.body.id, (err, data) => {
        if(err) throw err
        res.send(`${data.first_name} ${data.last_name} (${data.age}, ${data.group}) left the school`)
    })
})

module.exports = router
