
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function register(req , res) {
    try {
      const dbo = client.db('medirider')
      const booking = dbo.collection('booking')
      const ambulance = dbo.collection('ambulance')
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
    catch{
      console.log("error operation")
    }
  }