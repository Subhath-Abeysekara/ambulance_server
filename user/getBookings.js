const client = require('../service/service')
const validate_token = require('../authentication/authenticate')

module.exports = async function getBookings(req , res) {
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
      const booking = dbo.collection('booking')
      const result = await booking.find({
         user_id:validity.userId
      });
      var ongoing = []
      var pending = []
      var dropped = []
      var rejected = []
      var accepted = []
      await result.forEach(element => {
        console.log(element)
        switch (element.state){
          case "pending":
            pending.push(element)
            break
          case "ongoing":
            ongoing.push(element)
            break
          case "rejected":
            rejected.push(element)
            break
          case "dropped":
            dropped.push(element)
            break
          case "accepted":
            accepted.push(element)
            break
        }
      });
      res.json({
        message:"success",
        body:{
          ongoing,
          pending,
          accepted,
          rejected,
          dropped
        }
      })
    } 
    catch{
      console.log("error connection")
    }
  }