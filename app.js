const http = require("http");
const url = require("url");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;

// IP
const hostname = "127.0.0.1";
const port = 3000;

//Database
var dbConnection;
var client;
connectToDB();

const wordServer = http.createServer(async (req, res) => {
  //Routing. Use library ie. Express to make it easier if project grows
  const pathName = req.url;
  console.log(pathName);

  if (pathName === "/words") {
    var words = await findWord(client, 2);
    console.log("words: " + words);
    var wordJSON = JSON.stringify(words);
    console.log("JSON: " + wordJSON);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(wordJSON);
  } else if (pathName === "/script.js") {
    const file = fs.readFileSync(
      `${__dirname}/salasana_generaattori.js`,
      "utf-8"
    );

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/javascript");
    res.end(file);
  } else {
    const file = fs.readFileSync(`${__dirname}/index.html`, "utf-8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(file);
  }
});

wordServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function connectToDB() {
  //this user only has reading permissions on the database, update and delete can't be called
  const atlasUri =
    "mongodb+srv://reader:eUC7Z1wWT9QA98mw@salasanageneraattori.apcumhq.mongodb.net/?retryWrites=true&w=majority";
  const assert = require("assert");

  client = new MongoClient(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect((err) => {
    const collection = client.db("salasanageneraattori").collection("sanasto");
    console.log("Connected");
  });
  await findWord(client, 1);
  console.log("Server connected to DB successfully");
  //En tiedä pitäisikö yhteys tietokantaan katkaista joka queryn jälkeen vai voiko olla koko ajan päällä?
  //Nyt serveri yhdistää käynnistäessä ja pitää sen jatkuvana.
}

//hakee random sanoja resultsLimit numeron perusteella
async function findWord(client, resultsLimit) {
  const cursor = client
    .db("salasanageneraattori")
    .collection("sanasto")
    .aggregate([{ $sample: { size: resultsLimit } }]);

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
