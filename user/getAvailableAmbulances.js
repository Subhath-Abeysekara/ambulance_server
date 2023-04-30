const client = require('../service/service')
const validate_token = require('../authentication/authenticate')
const catculate = require('./calculate_distance')

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
      let latitude = 0
        let longitude = 0
      if("latitude" in req.body && "longitude" in req.body){
         latitude = req.body.latitude
         longitude = req.body.longitude
      }
      else{
           latitude=6.0329,
           longitude=80.2168
      }
      const result = await ambulance.find({
         availability:true
      });
      var response = []
      await result.forEach(async element => {
        console.log(element)
        const values = await catculate(latitude,longitude)
        const res_body = {
          ambulance_data:element,
          map_data:values
        }
        response.push(res_body)
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