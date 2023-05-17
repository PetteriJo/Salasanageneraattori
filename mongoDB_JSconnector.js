const mongoose = require('mongoose');
//this user only has reading permissions on the database, update and delete can't be called
const atlasUri = "mongodb+srv://reader:eUC7Z1wWT9QA98mw@salasanageneraattori.apcumhq.mongodb.net/?retryWrites=true&w=majority"

//attempt connection
try {
	mongoose.connect(atlasUri, 
					{useNewUrlParser: true, useUnifiedTopology: true});
	console.log("mongoose is connected", atlasUri)
}
catch (e) {
	console.log("unable to connect");
}

//connection saved to variable
const dbConnection = mongoose.connection;

//log any possible errors
dbConnection.on('error', (error) => {
		console.warn('Warning', error);
	}); 
//wait for connection to load before doing anything else
dbConnection.once('open', () => console.log('Good to go!'))
