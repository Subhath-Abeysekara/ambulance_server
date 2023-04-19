const express = require('express')
const router = express.Router()
const validate = require("../public/validate")

router.get('/validate/:api_no' , (req,res,next)=>{
    validate(req , res)
 })

 module.exports = router