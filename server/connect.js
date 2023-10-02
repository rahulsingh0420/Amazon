const {MongoClient} = require("mongodb")
const uri="mongodb+srv://amazonUser:amazon2pass@cluster0.pyfkr32.mongodb.net/?retryWrites=true&w=majority"
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