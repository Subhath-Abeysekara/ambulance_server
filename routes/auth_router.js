const express = require('express')
const router = express.Router()
const validate = require("../public/validate")
const login = require("../public/login")

router.get('/validate/:api_no' , (req,res,next)=>{
    validate(req , res)
 })

router.post('/login' , (req,res,next)=>{
    login(req, res)
 })

 module.exports = router