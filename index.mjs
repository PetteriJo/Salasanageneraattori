import { MongoClient } from "mongodb";
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

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase();

  var words = await getWords(db);

  var wordJSON = JSON.stringify(words);
  console.log("words: " + words);
  console.log("JSON: " + wordJSON);

  let response = {
    statusCode: 200,
    contentType: "application/json",
    body: JSON.stringify(words),
  };
  return response;
};

async function getWords(db) {
  const cursor = db.collection("sanasto").aggregate([{ $sample: { size: 5 } }]);

  const results = await cursor.toArray();
  var words = [];
  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      let sana;
      sana = result.Hakusana;
      console.log(sana);
      words.push(sana);
    });
  }
  console.log(words);
  return words;
}
