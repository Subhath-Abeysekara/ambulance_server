
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function register(req , res) {
    try {
      const dbo = client.db('medirider')
      const user = dbo.collection('user')
      const result = await user.insertOne(req.body);
      const token = await generate_token(result.insertedId.toString() , 'user')
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