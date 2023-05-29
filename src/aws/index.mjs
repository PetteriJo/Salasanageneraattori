import { MongoClient } from "mongodb.MongoClient";
const atlasUri =
  "mongodb+srv://reader:eUC7Z1wWT9QA98mw@salasanageneraattori.apcumhq.mongodb.net/?retryWrites=true&w=majority";
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our MongoDB database hosted on MongoDB Atlas
  const client = await MongoClient.connect(atlasUri);

  // Specify which database we want to use
  const db = await client.db("salasanageneraattori");

  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase();
  const words = await db
    .collection("sanasto")
    .aggregate([{ $sample: { size: 5 } }]);

  var wordJSON = JSON.stringify(words);
  console.log("JSON: " + wordJSON);

  const response = {
    statusCode: 200,
    body: wordJSON,
  };
  return response;
};
