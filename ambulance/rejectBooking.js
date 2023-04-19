const { ObjectId } = require('mongodb')
const client = require('../service/service')
const validate_token = require('../authentication/authenticate')

module.exports = async function optBooking(req , res) {
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
      const ambulance = dbo.collection('ambulance')
      const result = await booking.updateOne({
        '_id': new ObjectId(req.params.booking_id)
      },
      {
        $set: {
            state: "rejected"
        }
      });
      const result2 = await ambulance.updateOne({
        '_id': new ObjectId(validity.userId)
      },
      {
        $set: {
          availability: true
        }
      });
      res.json({
        message:"success",
        body:result
      })
    } 
    catch{
      console.log("error connection")
    }
  }