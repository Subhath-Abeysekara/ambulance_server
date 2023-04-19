const client = require('../service/service')
const validate_token = require('../authentication/authenticate')

module.exports = async function getAvailables(req , res) {
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
      const ambulance = dbo.collection('ambulance')
      const result = await ambulance.find({
         availability:true
      });
      var response = []
      await result.forEach(element => {
        console.log(element)
        response.push(element)
      });
      res.json({
        message:"success",
        body:response
      })
    } 
    catch{
      console.log("error connection")
    }
  }