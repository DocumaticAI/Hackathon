const { MessageEmbed } = require('discord.js');
module.exports = {
	commandName: 'serverinfo',
	description: 'Displays various information about server',
	async run({ interaction, bot }) {
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor('BLURPLE')
					.setAuthor({
						name: interaction.guild.name,
						iconURL:
							interaction.guild.iconURL() ||
							'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg',
					})
					.setThumbnail(
						interaction.guild.iconURL() ||
							'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg'
					)
					.addField(
						'Server Creation',
						`<t:${Math.round(interaction.guild.createdTimestamp / 1000)}:f>`,
						false
					)
					.addField('Owner', `${interaction.guild.fetchOwner}`, false)
					.addField('Total Members', `${interaction.guild.memberCount}`, false)
					.addField(
						'Total Channels',
						`${interaction.guild.channels.fetch()}`,
						false
					)
					.setFooter({
						text: `Guild ID: ${interaction.guild.id}`,
					}),
			],
		});
	},
};
