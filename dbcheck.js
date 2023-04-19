const { ObjectId } = require('mongodb');
const client = require('./service/service')

module.exports = async function run(req , res) {
    try {
      console.log("connected")
      const dbo = client.db('medirider')
      const ambulance = dbo.collection('ambulance')
      const findResult = await ambulance.findOne(
          {
            '_id': new ObjectId('643ebbccf810a2f39ddda3a0')
          });
        // var result = []
        // await findResult.forEach(console.dir);
        console.log(findResult._id.toString())
        res.json(findResult)
    } 
    catch{
      console.log("error connection")
    }
  }