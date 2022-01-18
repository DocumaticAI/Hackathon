const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lockdown',
	description: 'Lockdown the server.',
	category: 'Moderation',
	async run({ interaction, bot, guild }) {
		await guild.roles.everyone.setPermissions(role.permissions.remove('SEND_MESSAGES'));

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(bot.config.colors.green)
					.setDescription(`${bot.config.emotes.success} Server locked.`)
			]
		});
	}
};
