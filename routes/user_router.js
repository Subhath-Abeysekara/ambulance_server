const express = require('express')
const router = express.Router()
const register = require('../user/register')
const getAvailables = require('../user/getAvailableAmbulances')
const addBokking = require('../user/addBooking')
const getBoookings = require('../user/getBookings')
const login = require('../user/login')

router.post('/register' , (req,res,next)=>{
    register(req, res)
 })

 router.post('/login' , (req,res,next)=>{
   login(req, res)
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