const { MessageEmbed } = require('discord.js');
module.exports = {
	event: 'interactionCreate',
	async run(bot, interaction) {
		if (!interaction.isCommand()) return;

		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.run({ interaction, bot, options: interaction.options });
		} catch (err) {
			await interaction[
				interaction.deferred
					? 'editReply'
					: interaction.replied
					? 'followUp'
					: 'reply'
			]({
				embeds: [
					new MessageEmbed().setColor('RED').setDescription(err.message),
				],
			});
		}
	},
};
