const validate_token = require('../authentication/authenticate')
const client = require('../service/service')
const { ObjectId } = require('mongodb')

module.exports = async function register(req , res) {
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
      const ambulance = dbo.collection('ambulance')
      req.body['user_id'] = validity.userId
      const findResult = await ambulance.findOne(
        {
          '_id': new ObjectId(req.body.ambulance_id)
        });
      if(findResult.availability){
        const result = await booking.insertOne(req.body);
      const result2 = await ambulance.updateOne({
        '_id': new ObjectId(req.body.ambulance_id)
      },
      {
        $set: {
          availability: false
        }
      });
      res.json({
        message:"success",
        insert_id:result.insertedId,
      })
      }
      else{
        res.json({
          message:"rejected",
          error:"ambulance has already booked"
        })
      }
    } 
    catch{
      console.log("error operation")
    }
  }