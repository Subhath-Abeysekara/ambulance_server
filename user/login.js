
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function register(req , res) {
    try {
      const dbo = client.db('medirider')
      const user = dbo.collection('user')
      const result = await user.find({
        name:req.body.name
     });
     let availability = false
     let user_id = ""
     await result.forEach(element => {
        console.log(element)
       if(element.password==req.body.password){
        availability = true
        user_id = element._id.toString
       }
     });
     if(availability){
      const token = await generate_token(user_id.toString() , 'user')
      res.json({
        message:"success",
        token:token
      })
      }
      else{
        res.json({
          message:"rejected",
          error:"error username or password"
        })
      }
    } 
    catch{
      console.log("error operation")
    }
  }