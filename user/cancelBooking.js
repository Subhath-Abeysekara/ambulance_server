const validate_token = require('../authentication/authenticate')
const client = require('../service/service')
const { ObjectId } = require('mongodb')

module.exports = async function cancel_booking(req , res) {
  try{
    var validity = await validate_token(req , 2)
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
      const findResult = await booking.findOne(
        {
          '_id': new ObjectId(req.params.booking_id)
        });
      if(findResult.state==="pending"){
      const result2 = await booking.deleteOne({
        '_id': new ObjectId(req.params.booking_id)
      });
      res.json({
        message:"success",
      })
      }
      else{
        res.json({
          message:"rejected",
          error:"ambulance has already accepted"
        })
      }
    } 
    catch{
      console.log("error operation")
    }
  }