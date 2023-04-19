
const validate_token = require('../authentication/authenticate')

module.exports = async function getBookings(req , res) {
    try{
        var validity = await validate_token(req , req.params.api_no)
        console.log(validity)
        if (!validity.condition){
            res.send("not valid")
            return
        }
        else{
            res.send("valid")
        }
    }
    catch{
        console.log("catch")
        res.send("not valid")
        return
    }
  }