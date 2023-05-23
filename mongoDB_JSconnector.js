async function main() {
	const mongoose = require('mongoose');
	const MongoClient = require('mongodb').MongoClient;
	//this user only has reading permissions on the database, update and delete can't be called
	const atlasUri = "mongodb+srv://reader:eUC7Z1wWT9QA98mw@salasanageneraattori.apcumhq.mongodb.net/?retryWrites=true&w=majority"
	const assert = require('assert');

	const client = new MongoClient(atlasUri, 
						{useNewUrlParser: true, useUnifiedTopology: true});


	await client.connect((err) => {
		const collection = client.db('salasanageneraattori').collection('sanasto');
		console.log('Connected');
		});
	await findWord(client, 3);
	console.log('FindWord excecuted');
	client.close();
	console.log('Connection closed.');
}


main().catch(console.error);

//hakee random sanoja resultsLimit numeron perusteella
async function findWord(client, resultsLimit)
{
	const cursor = client
		.db('salasanageneraattori')
		.collection('sanasto')
		.aggregate(
			[{$sample: {size: resultsLimit}}]
			)
		

	const results = await cursor.toArray();
		if (results.length > 0) {
		console.log(`Found ${results.length} listing(s):`);
		results.forEach((result, i) => {
			let sana;
			sana = result.Hakusana;
			console.log();
			console.log(sana);
		});

	};
}
	

