module.exports = {
	name: 'ping',
	description: "Shows bot's ping; pong.",
	category: 'Info',
	async run({ interaction, bot }) {
		const calculateping = await interaction.followUp({
			embeds: [new MessageEmbed().setColor(bot.config.colors.green).setDescription('Please wait...')]
		});
		return calculateping.edit({
			embeds: [
				new MessageEmbed()
					.setColor(bot.config.colors.green)
					.addField('API Pong', `${Math.round(bot.ws.ping)} ms`)
					.addField('Latency', `${calculateping.createdTimestamp - Date.now()}`)
			]
		});
	}
};
