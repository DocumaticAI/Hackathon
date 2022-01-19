const { MessageEmbed } = require('discord.js');
module.exports = {
	event: 'interactionCreate',
	async run(bot, interaction) {
		if (!interaction.isCommand()) return;

		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		if (command.permission && !interaction.member.permissions.has(command.permission))
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor('RED')
						.setDescription(`${bot.config.emotes.fail} You require the \`${command.permission}\` to run this command.`)
				]
			});

		try {
			await command.run({ interaction, bot, options: interaction.options, guild: interaction.guild });
		} catch (err) {
			console.log(err);

			await interaction[interaction.deferred ? 'editReply' : interaction.replied ? 'followUp' : 'reply']({
				embeds: [new MessageEmbed().setColor('RED').setDescription(err.message || 'Unexpected error')]
			});
		}
	}
};
