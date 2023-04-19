const express = require('express')
const router = express.Router()
const user = require('../models/user')

router.post('/register' , (req,res,next)=>{
    let newUser =  new user({
        name:req.body.name,
        contact_no:req.body.contact_no,
        device_id:req.body.device_id,
    })

    newUser.save((err,user)=>{
        if(err){
            res.json({msg:"faled to add ambulance"})
        }
        else{
            res.json({msg:"added"})
        }
    })
 })