const client = require('../service/service')

module.exports = async function getAvailables(req , res) {
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