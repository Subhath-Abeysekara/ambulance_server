
const client = require('../service/service')
const generate_token = require('../authentication/generate_token')

module.exports = async function register(req , res) {
  try {
    const dbo = client.db('medirider')
    const ambulance = dbo.collection('ambulance')
    const auth = dbo.collection('auth')
    const result = await auth.find({
      name:req.body.name
   });
   let availability = false
   await result.forEach(element => {
     availability = true
   });
    if(!availability){
      const body = {
        name : req.body.name,
        password : req.body.password,
        role:"ambulance"
      }
      delete req.body.name
      delete req.body.password
      const result2 = await ambulance.insertOne(req.body);
      body.ref_id = result2.insertedId.toString()
      const result3 = await auth.insertOne(body);
    const token = await generate_token(result2.insertedId.toString() , 'ambulance')
    res.json({
      message:"success",
      insert_id:result2.insertedId,
      token:token
    })
    }
    else{
      res.json({
        message:"rejected",
        error:"username is already available"
      })
    }
  } 
  catch{
    console.log("error operation")
  }
  }