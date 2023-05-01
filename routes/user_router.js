const express = require('express')
const router = express.Router()
const register = require('../user/register')
const getAvailables = require('../user/getAvailableAmbulances')
const addBokking = require('../user/addBooking')
const getBoookings = require('../user/getBookings')
const getBookingByID = require('../user/getBookingByID')
const cancel_booking = require('../user/cancelBooking')


router.post('/register' , (req,res,next)=>{
    register(req, res)
 })

 router.post('/getAvailables' , (req,res,next)=>{
    getAvailables(req, res)
 })

 router.post('/addBooking' , (req,res,next)=>{
    addBokking(req, res)
 })

 router.get('/getBookings' , (req,res,next)=>{
    getBoookings(req, res)
 })

 router.get('/getBookingById/:booking_id' , (req,res,next)=>{
   getBookingByID(req, res)
})

 router.delete('/cancelBooking/:booking_id' , (req,res,next)=>{
   cancel_booking(req, res)
})

 module.exports = router