const express = require("express")

const router = express.Router()
const School = require('../db/models/SchoolModel.js').model
const Teacher = require('../db/models/TeacherModel.js').model
const Student = require('../db/models/StudentModel.js').model
const Lesson = require('../db/models/LessonModel.js').model
const User = require('../db/models/usermodel.js')

const student_route = require('./student_routes.js')
const teacher_route = require('./teacher_routes.js')
const lesson_route = require('./lesson_routes.js')

router.use('/students', student_route)
router.use('/teachers', teacher_route)
router.use('/lessons', lesson_route)

// ==== School routes

router.get('/', (req, res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user) {
             School.find().then(data => res.json(data))
        } else {
        res.send('Please sign in to get any data by /signin link')
        }
    })     
})




router.post('/', (req, res) => {
    User.findOne({ isActive: true }).then(user => {  
        if(user && user.role != 'USER') {
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
        } else {
            res.send('Students are not allowed to post any data')
        }
    })
})

router.delete('/', (req, res) => {
    User.findOne( { isActive: true } ).then(user => {
        if(user && user.role === 'ADMIN') {
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
        } else {
            res.send('You have not enough rights to delete smth')
        }
    }) 
})

router.put('/', (req,res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user && user.role === 'ADMIN') {
            School.findOneAndUpdate({ number: req.body.number }, {
                number: req.body.new_number
            }, (err, data) => {
                if(err) throw err;
                res.send(`Our new number is ${req.body.new_number}`)
            })
        } else {
            res.send("Only Director can update school's number")
        }
    }) 
})
// ==== Group routes

router.get('/groups', (req, res) => {
    User.findOne({ isActive: true }).then(user => {
        if(user) {
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
        } else {
            res.send('Please sign in to get any data by /signin link')
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
