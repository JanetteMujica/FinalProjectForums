'use strict';

const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const postNewTheme = async (req, res) => {
	// Request newTheme from body
	const { theme, email } = req.body;
	const generatedId = uuidv4();

	// CALL client  from MongoDB
	const client = new MongoClient(MONGO_URI, options);

	try {
		await client.connect();
		const db = client.db('ailleursConseil');
		console.log('connected!');

		// INSERT NEW THEME INTO THEMES COLLECTION
		const result = await db
			.collection('themes')
			.insertOne({ _id: generatedId, theme });

		/* 	return res.status(200).json({ data: result }); */

		//uptage the user collection which is not what I want. I want to update an existing user
		const updateUserWithNewTheme = await db.collection('users').updateOne(
			{ email },
			{
				$push: {
					themes: generatedId,
				},
			},
			{
				upsert: true,
			}
		);

		console.log(updateUserWithNewTheme);
		/* 		db.collection('themes')
			.find()
			.forEach(function (d) {
				db.getSiblingDB('ailleursConseil')['user'].insert(d);
			}); */
		// send response back to frontend as well
		if (result) {
			return res.status(200).json({ data: result });
		}

		if (updateUserWithNewTheme)
			res.status(200).json({ data: updateUserWithNewTheme });
		else {
			// if not found
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			ok: false,
			status: 500,
			message: '[ ERROR ]: Internal server error',
		});
	} finally {
		await client.close();
		console.log('disconnected!');
	}
};

module.exports = { postNewTheme };
