const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports = async function issue_token(userId , userType){
    dotenv.config()
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: userId,
        userType: userType
    }
    console.log(data)
    const token = jwt.sign(data, jwtSecretKey,{
        expiresIn: "60000000m"
      });
      return token
}