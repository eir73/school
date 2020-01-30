const express = require("express")

const router = express.Router()
const School = require('../db/models/SchoolModel.js').model
const Teacher = require('../db/models/TeacherModel.js').model
const Student = require('../db/models/StudentModel.js').model
const Lesson = require('../db/models/LessonModel.js').model


router.get('/', (req, res) => {
    /*Teacher.find().then(data => res.json(data))
    Student.find().then(data => res.json(data))*/
    School.find().then(data => res.json(data))
})

router.post('/', (req, res) => {
    if(School.findOne().then(data => data.number)) {
        const school = new School({
            number: req.body.number
        })
        school.save().then(data => {
                res.send(`School number ${data.number} is created`)
            })
    } else {
        res.send("The School is already exist")
    }
})

router.delete('/', (req, res) => {
    if(req.body.number) {
        School.findOne().then(school => {
            school.groups.length = 0
        })
        School.findOneAndDelete({
            number: req.body.number
        }, async function(err, data)  {
            if(err) throw err;
            if(data) {
                await Teacher.remove()
                await Student.remove()
                await Lesson.remove()
                await res.send(`School number ${data.number} was deleted`)
            }
            else {
                res.send(`School number ${req.body.number} doesn't exist`)
            }
        })
    } else {
        res.send('Invalid params to delete the school')
    }
    
})

router.get('/groups', (req, res) => {
    if(School.findOne()) {
        let groups = new Array
        Student.find().then(data => {
            for(let i = 0; i < data.length; i++) {
                groups.push(data[i].group)
            }
            groups = unique(groups)
            res.json(groups)
        })
    } else {
        res.send('Create the school, add some students, and then we can show you the group list')
    }
})

// === Teacher routes

router.get('/teachers', (req, res) => {
    if(School.findOne()) {
        Teacher.find().then(data => {
            res.send(data)
        })
    } else {
        res.send('create the school, add some teachers, and then we can show them')
    }
})

router.post('/teachers', (req,res) => {
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
})

router.delete('/teachers', (req, res) => {
    if(School.findOne()) {
        Teacher.findByIdAndDelete(req.body.id, (err, data) => {
            if(err) throw err
            res.send(`Teacher ${data.name} left the school`)
        })
    } else {
        res.send('There is nothing to delete (Create a school, add some lessons, and then you can delete something)')
    }
})

//===== lesson routes ======

router.get('/lessons', (req, res) => {
    if(School.findOne()) {
        Lesson.find().then(lessons => {
            res.json(lessons)
        })
    } else {
        res.send('create the school, add some lessons, and then we can show them')
    }
})

router.post('/lessons', (req, res) => {
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
})


router.delete('/lessons', (req, res) => {
    if(School.findOne()) {
        Lesson.findByIdAndDelete(req.body.id, (err, data) => {
            if(err) throw err
            res.send(`${data.theme} lesson (${data.group}, ${data.classroom}cab.) is canceled`)
        })
    } else {
        res.send('There is nothing to delete\n(Create a school, add some lessons, and then you can delete something)')
    }
})

//===== Student routes =========

router.post('/students', (req, res) => {
    if(School.findOne()) {
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
                        School.findOne().then(school => {
                            school.students.push(student)
                            school.groups.push(student.group)
                            school.groups = unique(school.groups)
                            school.save()
                        })  
                        res.send(`${data.first_name}, welcome to our school!`)
                    })
            }
            else {
                res.send('This student has already exist')
            }
        })
    } else {
        res.send('Create a school to start adding any units')
    }
})

router.get('/students', (req, res) => {
    if(School.findOne()) {
        Student.find().then(students => {
            res.json(students)
        })
    } else {
        res.send('create the school, add some students, and then we can show them')
    }
})

router.delete('/students', (req, res) => {
    if(School.findOne()) {
        Student.findByIdAndDelete(req.body.id, (err, data) => {
            if(err) throw err
            res.send(`${data.first_name} ${data.last_name} (${data.age}, ${data.group}) left the school`)
        })
    } else {
        res.send('There is nobody to delete\n(Create a school, add some members, and then you can delete somebody)')
    }
})

router.put('/students', (req, res) => {
    //...
})


function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}
    
module.exports = router
