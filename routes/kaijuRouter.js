const express = require('express')
const router = express.Router()
const getPrivateKey = require('../kaiju/getPrivateKey')

router.post('/getPrivateKey' , (req,res,next)=>{
    getPrivateKey(req , res)
 })

 module.exports = router