const { ObjectId } = require('mongodb')
const client = require('../service/service')
const validate_token = require('../authentication/authenticate')

module.exports = async function getBookings(req , res) {
    try{
        var validity = await validate_token(req , 1)
        console.log(validity)
        if (!validity.condition){
            res.send("not valid")
            return
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
    try {
      const dbo = client.db('medirider')
      const booking = dbo.collection('booking')
      const result = await booking.find({
        ambulance_id:validity.userId
      });
      var response = []
      await result.forEach(element => {
        console.log(element)
        response.push(element)
      });
      res.json({
        message:"success",
        body:response
      })
    } 
    catch{
      console.log("error connection")
    }
  }