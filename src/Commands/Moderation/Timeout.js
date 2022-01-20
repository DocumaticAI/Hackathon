const { confirm } = require('../../Structures/Utils');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'timeout',
	description: 'Timeout a member.',
	category: 'Moderation',
	options: [
		{
			name: 'user',
			description: 'Mention a user',
			required: true,
			type: 'USER'
		},
		{
			name: 'duration',
			description: 'The timeout duration',
			type: 'STRING',
			required: true
		},
		{
			name: 'reason',
			description: 'Specify reason for timeout',
			required: true,
			type: 'STRING'
		}
	],
	permissions: 'MODERATE_MEMBERS',
	async run({ interaction, bot }) {
		const member = interaction.options.getMember('user', true);
		const duration = interaction.options.getString('duration', true);
		const reason = interaction.options.getString('reason', true);

		if (!member.moderatable)
			return await interaction.reply({
				embeds: [new MessageEmbed().setColor('RED').setDescription(`${bot.config.emotes.fail} I can't timeout them.`)]
			});

		if (member.id === interaction.user.id)
			return await interaction.reply({
				embeds: [
					new MessageEmbed().setColor('RED').setDescription(`${bot.config.emotes.fail} You can't timeout yourself.`)
				]
			});

		const confirmation = await confirm(
			interaction,
			new MessageEmbed()
				.setTitle('Pending Conformation')
				.setColor('BLURPLE')
				.setDescription(`Are you sure you want to timeout ${member} for reason: \`${reason}\`?`)
				.setFooter({ text: 'You have 60 seconds.' })
		);

		if (confirmation.proceed) {
			await member.timeout(ms(duration), reason);

			const embed = new MessageEmbed()
				.setColor(bot.config.colors.green)
				.setDescription(`${bot.config.emotes.success} **${member.user.tag}** was timedout for \`${reason}\`.`);

			try {
				await member.send({
					embeds: [
						new MessageEmbed()
							.setTitle('You were timedout')
							.setColor('BLURPLE')
							.addField('Reason', reason, false)
							.addField('Guild', interaction.guild.name, false)
							.addField('Duration', ms(ms(duration), { long: true }))
							.addField('Date', time(new Date(), 'F'), false)
					]
				});
			} catch (err) {
				embed.setFooter({
					text: `I was not able to DM inform them`
				});
			}

			return await confirmation.i.update({
				embeds: [
					new MessageEmbed()
						.setColor(bot.config.colors.green)
						.setDescription(`${bot.config.emotes.success} **${member}** was timedout successfully.`)
				],
				components: []
			});
		}

		const embed = new MessageEmbed()
			.setTitle('Process Cancelled')
			.setColor('BLURPLE')
			.setDescription(`${member} was not timedout.`);

		if (confirmation.reason) embed.setFooter({ text: confirmation.reason });

		await confirmation.i.update({
			embeds: [embed],
			components: []
		});
	}
};
