const express = require('express')
const router = express.Router()
const register = require('../user/register')
const getAvailables = require('../user/getAvailableAmbulances')
const addBokking = require('../user/addBooking')
const getBoookings = require('../user/getBookings')

router.post('/register' , (req,res,next)=>{
    register(req, res)
 })

 router.get('/getAvailables' , (req,res,next)=>{
    getAvailables(req, res)
 })

 router.post('/addBooking' , (req,res,next)=>{
    addBokking(req, res)
 })

 router.get('/getBookings' , (req,res,next)=>{
    getBoookings(req, res)
 })

 module.exports = router