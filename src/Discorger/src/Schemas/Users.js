const { Schema, model } = require('mongoose');

const Users = new Schema({
	UserId: { type: String, unique: true },
	Coins: { type: Number, default: 5000 },
	Saves: [],
	Skills: {
		//
	},
	//
});
module.exports = model('Users', Users);