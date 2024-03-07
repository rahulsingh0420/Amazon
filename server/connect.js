const {MongoClient} = require("mongodb")
const uri=""
// paste your mongo db uri here for database connection.Thankiyou !
let client;
let clientPromise;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }

clientPromise = global._mongoClientPromise  
module.exports=clientPromise;
