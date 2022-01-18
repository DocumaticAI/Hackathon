const { confirm } = require('../../Structures/Utils');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kick a member.',
	category: 'Moderation',
	options: [
		{
			name: 'user',
			description: 'Mention a user',
			required: true,
			type: 'USER'
		},
		{
			name: 'reason',
			description: 'Specify reason for kick',
			required: true,
			type: 'STRING'
		}
	],
	permissions: 'KICK_MEMBERS',
	async run({ interaction, bot, guild }) {
		const user = interaction.options.getMember('user');
		const reason = interaction.options.getString('reason');

		if (!user.kickable)
			return interaction.reply({
				embeds: [new MessageEmbed().setColor('RED').setDescription(`I don't have permissions to kick ${user}.`)]
			});
		if (user.id === interaction.user.id)
			return interaction.reply({
				embeds: [new MessageEmbed().setColor('RED').setDescription(`You cannot kick yourself.`)]
			});

		const confirmation = await confirm(
			interaction,
			new MessageEmbed()
				.setTitle('Pending Conformation')
				.setColor('BLURPLE')
				.setDescription(`Are you sure you want to kick ${user} for reason: \`${reason}\`?`)
				.setFooter({ text: 'You have 60 seconds.' })
		);

		if (confirmation.proceed) {
			const embed = new MessageEmbed()
				.setColor(bot.config.colors.green)
				.setDescription(`${bot.config.emotes.success} **${member.user.tag}** was kicked for \`${reason}\`.`);

			try {
				await user.send({
					embeds: [
						new MessageEmbed()
							.setTitle('You were kicked')
							.setColor('BLURPLE')
							.addField('Reason', reason, false)
							.addField('Guild', interaction.guild.name, false)
							.addField('Date', time(new Date(), 'F'), false) // TODO: add date to the other DMs
					]
				});
			} catch (err) {
				embed.setFooter({
					text: `I was not able to DM inform them`
				});
			}
			await confirmation.i.update({
				embeds: [embed],
				components: []
			});

			await user.kick({ reason });
		}

		const embed = new MessageEmbed()
			.setTitle('Process Cancelled')
			.setColor('BLURPLE')
			.setDescription(`${user} was not kicked.`);

		if (confirmation.reason) embed.setFooter({ text: confirmation.reason });

		await confirmation.i.update({
			embeds: [embed],
			components: []
		});
	}
};
