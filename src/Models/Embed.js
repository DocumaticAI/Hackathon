const { model, Schema } = require('mongoose');
module.exports = model(
	'Embed',
	new Schema({
		GuildID: String,
		EmbedID: String,
		EmbedAuthor: String,
		EmbedThumbnail: String,
		EmbedImage: String,
		EmbedDescription: String,
		EmbedFooter: String,
		EmbedTimestamp: Boolean,
	})
);
