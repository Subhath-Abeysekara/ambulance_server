
const service = require('./service/service')

var dbo = service.db('medirider')
const result = dbo.collection('medirider').find()
console.log(result.toArray())