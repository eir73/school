const express = require("express")

const router = express.Router()
const School = require('../db/models/SchoolModel.js').model
const Teacher = require('../db/models/TeacherModel.js').model
const Student = require('../db/models/StudentModel.js').model
const Lesson = require('../db/models/LessonModel.js').model
const User = require('../db/models/usermodel.js')


// === Teacher routes

router.get('/', (req, res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user) {
            if(School.findOne()) {
                Teacher.find().then(data => {
                    res.send(data)
                })
            } else {
                res.send('create the school, add some teachers, and then we can show them')
            }
        } else {
            res.send('Please sign in to get any data by /signin link')
        }
    })
})

router.post('/', (req,res) => {
    User.findOne({ isActive: true }).then(user => {  
        if(user && user.role != 'USER') {
            if(School.findOne()) {
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
                                School.findOne().then(school => {
                                    school.teachers.push(teacher)
                                    school.save()
                                })
                                res.send(`${data.name}, welcome to our school!`)
                            })
                    }
                    else {
                        res.send('This teacher has already exist')
                    }
                })
            } else {
                res.send('Create a school to start adding any units')
            }
        } else {
            res.send('Students are not allowed to post any data')
        }
    })
})

router.delete('/', (req, res) => {
         User.findOne( { isActive: true } ).then(user => {
        if(user && user.role === 'ADMIN') {
            if(School.findOne()) {
                Teacher.findByIdAndDelete(req.body.id, (err, data) => {
                    if(err) throw err
                    res.send(`Teacher ${data.name} left the school`)
                })
            } else {
                res.send('There is nothing to delete (Create a school, add some lessons, and then you can delete something)')
            }
         } else {
             res.send('You have not enough rights to delete smth')
         }
     })
})

router.put('/', (req, res) => {
   User.findOne({ isActive: true }).then(user => {
        if(user && user.role !== 'USER') {
            Teacher.findByIdAndUpdate(req.body.id, {
                name: teacher.name,
                age: teacher.age,
                work_exp: teacher.work_exp
            }, (err, data) => {
                if(err) throw err;
                res.send(`Teacher ${data.name} was updated`)
            })
        } else {
            res.send('You have not enough rights to update smth')
        }
    }) 
})


module.exports = router