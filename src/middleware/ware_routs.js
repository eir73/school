const express = require("express")
const User = require("../db/models/usermodel.js")
const router = express.Router()

router.post('/', (req, res) => {

    User.find().then(users => {
        users.forEach(async function(member) {
            member.isActive = false
           await member.save()
        })
        
    }).then(() => {
             User.findOne({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            }).then(data => {
                data.isActive = true
                data.save().then(() => {
                    res.send(`Hello, ${data.username}`)
                    })
                }).catch(err => {
                 res.send('Invalid params')
             })
    })
})

router.delete('/', (req, res) => {
    if(req.body.all){
        User.remove().exec().then(() => {
            res.send("deleted!")
        })
    }
})

router.get('/', (req,res) => {
    User.find().then(data => res.json(data))
})

module.exports = router
