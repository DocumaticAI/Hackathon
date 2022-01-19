/* eslint-disable no-unused-vars */
const database = require('mongoose');
const User = require('../Schemas/Users');
const config = require('./BotConfig');

module.exports = class AcoliumDatabase {
	async loadDatabase() {

		database.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: false,
			connectTimeoutMS: 30000,
			family: 4,
		});

		database.connection.on('connected', () => {
			console.log('\x1b[32m[BOOT] \x1b[0mConnected to MongoDB!');
		});

		database.connection.on('err', (err) => {
			console.minor(`Unable to connect to the MongoDB: ${err}`);
		});

		database.connection.on('disconnected', () => {
			console.small('MongoDB connection is disconnected.');
		});
	}

	/**
    * @param {string} userId - Id of the User.
    */
	async findUser(userId) {
		if (!userId) return console.fatal('Argument missing: userId (index 0).');

		const user = await User.findOne({ UserId: userId });
		if (!user) {
			const newUser = new User({ UserId: userId });

			delete newUser.UserId_1;

			await newUser
				.save()
				.catch((error) => console.minor('Error catched: ' + error));
			return newUser;
		}
		else {return user;}
	}
	/**
	 * @param {string} query - The secified query.
	 * @param {string} data - The modified data.
	 * @param {string} schema - The specified schema.
	*/
	async forceUpdate(query, data, schema) {
		if (!query) return console.fatal('Argument missing: query (index 0).');
		if (!data) return console.fatal('Argument missing: data (index 1).');
		if (!schema) return console.fatal('Argument missing: schema (index 2).');

		const obj = {};

		Object.keys(data).forEach((e) => { obj[e] = data[e]; });

		delete obj._doc._id;
		delete obj._doc.__v;

		await schema.updateOne(query, obj._doc, { upsert: true });
		return true;
	}

	async addCoins(userId, amount) {
		const data = await this.findUser(userId);

		amount = data.Backpack.Craftable.CoinAmulet > 0 ? amount + (amount * (10 / 100)) : amount;
		data.Coins += amount;

		return data;
	}

	// async addAchievement(which, interaction, client) {
	// 	const data = await this.findUser(interaction.member.id);

	// 	if(data.Achievements[which] === true) return data;

	// 	client.createMessage(interaction.channel.id, `\`[🐒]\` New achievement!\n\`[  ]\` **${config.achievements[which].emoji + config.achievements[which].name}**.`);
	// 	data.Achievements[which] = true;

	// 	return data;
	// }
};