const express = require('express')

const router = express.Router()
const getAll = require('../ambulance/getAvailable')
const register = require('../ambulance/register')
const authenticate = require('../authentication/authenticate')

router.post('/register' , (req,res,next)=>{
    register(req , res)
 })

 router.get('/validate' , (req,res,next)=>{
    authenticate(req , res)
 })

 router.get('/getAll' , (req,res,next)=>{
    getAll(req , res)
 })

 module.exports = router