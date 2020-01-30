const express = require("express")

const router = express.Router()
const School = require('../db/models/SchoolModel.js').model
const Teacher = require('../db/models/TeacherModel.js').model
const Student = require('../db/models/StudentModel.js').model
const Lesson = require('../db/models/LessonModel.js').model
const User = require('../db/models/usermodel.js')


//===== lesson routes ======

router.get('/', (req, res) => {
     User.findOne({ isActive: true }).then(user => {
        if(user) {
            if(School.findOne()) {
                Lesson.find().then(lessons => {
                    res.json(lessons)
                })
            } else {
                res.send('create the school, add some lessons, and then we can show them')
            }
         } else {
            res.send('Please sign in to get any data by /signin link')
        }
     })
})

router.post('/', (req, res) => {
      User.findOne({ isActive: true }).then(user => {  
        if(user && user.role != 'USER') {
            if(School.findOne()) {
                const lesson = new Lesson({
                    theme: req.body.theme,
                    teacher: new Teacher({
                        name: req.body.t_name,
                        age: req.body.t_age,
                        work_exp: req.body.t_work_exp
                    }),
                    group: req.body.group,
                    classroom: req.body.classroom
                })

                Lesson.findOne({
                    theme: lesson.theme,
                    group: lesson.group,
                    teacher: {
                        name: lesson.teacher.name,
                        age: lesson.teacher.age,
                        work_exp: lesson.teacher.work_exp
                    },
                    classroom: lesson.classroom
                    }, (err, result) => {
                        if(err) throw err;
                        if(!result) {
                            lesson.save().then(data => {
                                School.findOne().then(school => {
                                    school.lessons.push(lesson)
                                    school.save()
                                })
                                res.send(`${data.theme} lesson (${data.group}, ${data.classroom}cab.) is created`)
                            })
                        }
                        else {
                            res.send("Oops, try another params!")
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
                Lesson.findByIdAndDelete(req.body.id, (err, data) => {
                    if(err) throw err
                    res.send(`${data.theme} lesson (${data.group}, ${data.classroom}cab.) is canceled`)
                })
            } else {
                res.send('There is nothing to delete\n(Create a school, add some lessons, and then you can delete something)')
            }
         } else {
             res.send('You have not enough rights to delete smth')
         }
    })
})

router.put('/', (req,res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user && user.role !== 'USER') {
            Lesson.findByIdAndUpdate(req.body.id, {
                theme: req.body.theme,
                teacher: new Teacher({
                    name: req.body.t_name,
                    age: req.body.t_age,
                    work_exp: req.body.t_work_exp
                }),
                group: req.body.group,
                classroom: req.body.classroom
            }, (err, data) => {
                if(err) throw err;
                res.send(`${data.theme} lesson (${data.group}, ${data.classroom}) was updated`)
            })
        } else {
            res.send('You have not enough rights to update smth')
        }
    })
})

module.exports = router