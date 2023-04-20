
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function register(req , res) {
    try {
      const dbo = client.db('medirider')
      const user = dbo.collection('ambulance')
      const result = await user.find({
        name:req.body.name
     });
     let availability = false
     await result.forEach(element => {
       availability = true
     });
      if(!availability){
        const result2 = await user.insertOne(req.body);
      const token = await generate_token(result.insertedId.toString() , 'ambulance')
      res.json({
        message:"success",
        insert_id:result2.insertedId,
        token:token
      })
      }
      else{
        res.json({
          message:"rejected",
        })
      }
    } 
    catch{
      console.log("error operation")
    }
  }