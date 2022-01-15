const { MessageEmbed } = require('discord.js');
module.exports = {
	commandName: 'userinfo',
	description: 'Displays various information about user',
	options: [
		{
			name: 'user',
			description: 'Mention user.',
			required: false,
			type: 'USER',
		},
	],
	async run({ interaction, bot }) {
		const user = interaction.options.getMember('user') || interaction.member;
		await user.user.fetch(true);
		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor('BLURPLE')
					.setAuthor({
						name: user.user.tag,
						iconURL:
							user.displayAvatarURL() ||
							'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg',
					})
					.setThumbnail(
						user.displayAvatarURL() ||
							'https://i.pinimg.com/736x/35/79/3b/35793b67607923a68d813a72185284fe.jpg'
					)
					.addField(
						'Account Creation',
						`<t:${Math.round(user.user.createdTimestamp / 1000)}:f>`,
						false
					)
					.setFooter({
						text: `User ID: ${user.id}`,
					}),
			],
		});
	},
};
