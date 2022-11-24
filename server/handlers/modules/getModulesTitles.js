'use strict';

const { MongoClient } = require('mongodb');

require('dotenv').config({ path: '../.env' });
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// RETURN AN ARRAY OF ALL iTEMS
const getModulesTitles = async (req, res) => {
	// CREATE A NEW CLIENT
	const client = new MongoClient(MONGO_URI, options);

	try {
		// connect to the client
		await client.connect();
		// connect to the database (db name is provided as an argument to the function)
		const db = client.db('ailleursConseil');
		console.log('connected!');

		const result = await db.collection('modules').find().toArray();

		console.log(result, 'RESULT');

		// target titre
		let titre = result.map(({ titre }) => titre);

		console.log(titre, 'TITRE');

		// response
		if (result.length <= 0) {
			res.status(404).json({ status: 404, message: 'title not found' });
		} else {
			res.status(200).json({ status: 200, data: titre });
		}
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({ status: 500, data: req.body, message: err.message });
	} finally {
		// close the connection to the database server
		client.close();
		console.log('disconnected!');
	}
};

module.exports = { getModulesTitles };
