const client = require('../service/service')
const validate_token = require('../authentication/authenticate')
const { ObjectId } = require('mongodb')

module.exports = async function getBookingById(req , res) {
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
      const result = await booking.findOne({
        '_id': new ObjectId(req.params.booking_id)
      });
      res.send(result)
    } 
    catch{
      console.log("error connection")
    }
  }