
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function register(req , res) {
    try {
      const dbo = client.db('medirider')
      const ambulance = dbo.collection('ambulance')
      const result = await ambulance.insertOne(req.body);
      const token = await generate_token(result.insertedId.toString() , 'ambulance')
      res.json({
        message:"success",
        insert_id:result.insertedId,
        token:token
      })
    } 
    catch{
      console.log("error operation")
    }
  }