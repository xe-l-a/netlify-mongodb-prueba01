
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://root:root@cluster0.yvkek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const collection = database.collection('movies');

    // Your MongoDB operations here
    const results = await collection.find().toArray();
    return{
        statusCode: 200,
        body: JSON.stringify(results)
    }
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

exports.handler = async (event, context) => {
  return await run()
};