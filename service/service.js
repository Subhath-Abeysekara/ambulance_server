const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config()
const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = client
