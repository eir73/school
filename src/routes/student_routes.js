const express = require("express")

const router = express.Router()
const School = require('../db/models/SchoolModel.js').model
const Teacher = require('../db/models/TeacherModel.js').model
const Student = require('../db/models/StudentModel.js').model
const Lesson = require('../db/models/LessonModel.js').model
const User = require('../db/models/usermodel.js')

//===== Student routes =========

router.post('/', (req, res) => {
     User.findOne({ isActive: true }).then(user => {  
        if(user && user.role != 'USER') {
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
        } else {
            res.send('Students are not allowed to post any data')
        }
     })
})

router.get('/', (req, res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user) {
            if(School.findOne()) {
                Student.find().then(students => {
                    res.json(students)
                })
            } else {
                res.send('create the school, add some students, and then we can show them')
            }
        } else {
            res.send('Please sign in to get any data by /signin link')
        }
    })
})

router.delete('/', (req, res) => {
    User.findOne( { isActive: true } ).then(user => {
        if(user && user.role === 'ADMIN') {
            if(School.findOne()) {
                Student.findByIdAndDelete(req.body.id, (err, data) => {
                    if(err) throw err
                    res.send(`${data.first_name} ${data.last_name} (${data.age}, ${data.group}) left the school`)
                })
            } else {
                res.send('There is nobody to delete\n(Create a school, add some members, and then you can delete somebody)')
            }
         } else {
             res.send('You have not enough rights to delete smth')
         }
    })
})

router.put('/', (req, res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user && user.role != 'USER') {
            Student.findByIdAndUpdate(req.body.id, {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                age: req.body.age,
                rating: req.body.rating,
                group: req.body.group
            }, (err, data) => {
                if(err) throw err;
                res.send(`${data.first_name} was updated`)
            })
        } else {
            res.send('You have not enough rights to update smth')
        }
    })
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