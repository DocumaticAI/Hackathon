const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with current latency of API'),
	async execute(interaction) {
		return interaction.editReply(':ping_pong: API Latency: ' + Math.round(interaction.client.ws.ping) + 'ms');
	},
};