
const client = require('./service')

module.exports = async function run() {
    await client.connect()
    console.log("connected")
}