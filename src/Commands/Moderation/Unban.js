const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { confirm } = require('../../Structures/Utils');
const regex = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
	name: 'unban',
	description: 'Unban a member.',
	category: 'Moderation',
	options: [
		{
			name: 'id',
			description: 'Provide user ID',
			required: true,
			type: 'STRING'
		}
	],
	async run({ interaction, bot, guild }) {
		const id = interaction.options.getString('id');
		if (!interaction.member.permissions.has('BAN_MEMBERS'))
			return await interaction.reply({
				embeds: [
					new MessageEmbed()
						.setColor('RED')
						.setDescription(`${bot.config.emotes.fail} You don't have permissions to unban members.`)
				]
			});

		if (!regex.test(id))
			return await interaction.reply({
				embeds: [
					new MessageEmbed().setColor('RED').setDescription(`${bot.config.emotes.fail} Please provide a valid user ID.`)
				]
			});

		const confirmation = await confirm(
			interaction,
			new MessageEmbed()
				.setTitle('Pending Conformation')
				.setColor('BLURPLE')
				.setDescription(`Are you sure you want to unban <@${id}>?`)
				.setFooter({ text: 'You have 60 seconds.' })
		);

		if (confirmation.proceed) {
			await confirmation.i.update({
				embeds: [
					new MessageEmbed()
						.setTitle('Unbanned')
						.setColor('BLURPLE')
						.addField('Offender', `<@${id}> [\`${id}\`]`, false)
						.addField('Moderator', `${interaction.user}`, false)
				],
				components: []
			});
			await interaction.guild.members.unban(id);
			// sure
		}

		const embed = new MessageEmbed()
			.setTitle('Process Cancelled')
			.setColor('BLURPLE')
			.setDescription(`${user} was not unbanned.`);

		if (confirmation.reason) embed.setFooter({ text: confirmation.reason });
		await msg.edit({
			embeds: [],
			components: []
		});
	}
};
