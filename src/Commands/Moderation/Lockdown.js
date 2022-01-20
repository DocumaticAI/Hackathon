const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lockdown',
	description: 'Lockdown the server.',
	category: 'Moderation',
	permissions: 'MANAGE_CHANNELS',
	async run({ interaction, bot, guild }) {
		/*
		If you have a main role;
		put it below as await guild.roles.fetch('id')
		remove sending permissions from @everyone
		same for lift-lockdown
		*/

		await guild.roles.everyone.setPermissions(guild.roles.everyone.permissions.remove('SEND_MESSAGES'));

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(bot.config.colors.green)
					.setDescription(`${bot.config.emotes.success} Server locked.`)
			]
		});
	}
};
