const { model, Schema } = require('mongoose');
module.exports = model(
	'Warning',
	new Schema({
		GuildID: String,
		WarnID: String,
		Reason: String,
		Moderator: String
	})
);
