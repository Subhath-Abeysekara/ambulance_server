const express = require('express')
const router = express.Router()
const register = require('../ambulance/register')
const getBookings = require('../ambulance/getBookings')
const getBookingsByState = require('../ambulance/getBookingByState')
const acceptBooking = require('../ambulance/acceptBooking')
const pickupBooking = require('../ambulance/pickupBooking')
const droppBokking = require('../ambulance/droppBooking')
const rejectBooking = require('../ambulance/rejectBooking')

router.post('/register' , (req,res,next)=>{
    register(req , res)
 })

 router.get('/getBoookings' , (req,res,next)=>{
    getBookings(req , res)
 })

 router.get('/getBoookingsByState/:state' , (req,res,next)=>{
   getBookingsByState(req , res)
})

router.put('/acceptBooking/:booking_id' , (req,res,next)=>{
   acceptBooking(req , res)
})

router.put('/rejectBooking/:booking_id' , (req,res,next)=>{
   rejectBooking(req , res)
})

router.put('/pickupBooking/:booking_id' , (req,res,next)=>{
   pickupBooking(req , res)
})

router.put('/droppBooking/:booking_id' , (req,res,next)=>{
   droppBokking(req , res)
})

 module.exports = router