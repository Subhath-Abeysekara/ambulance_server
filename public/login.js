
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function login(req , res) {
    try {
      const dbo = client.db('medirider')
      const auth = dbo.collection('auth')
      const result = await auth.find({
        name:req.body.name
     });
     let availability = false
     let user_id = ""
     let role = ""
     await result.forEach(element => {
        console.log(element)
       if(element.password==req.body.password){
        availability = true
        user_id = element.ref_id
        role = element.role
       }
     });
     if(availability){
      const token = await generate_token(user_id.toString() , role)
      res.json({
        message:"success",
        token:token,
        role:role
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