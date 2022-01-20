const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Shows bot's ping; pong.",
	category: 'Info',
	async run({ interaction, bot }) {
		const message = await interaction.reply({
			embeds: [new MessageEmbed().setColor(bot.config.colors.green).setDescription('Please wait...')],
			fetchReply: true
		});
		await interaction.editReply({
			embeds: [
				new MessageEmbed()
					.setColor(bot.config.colors.green)
					.addField('API Pong', `${Math.round(bot.ws.ping)} ms`)
					.addField('Latency', `${message.createdTimestamp - Date.now()}`)
			]
		});
	}
};
