const { sleep } = require('../../Structures/Utils');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'purge',
	description: 'Purge command',
	category: 'Moderation',
	permissions: 'MANAGE_MESSAGES',
	options: [
		{
			name: 'messages',
			description: 'Provide number of messages to be purged',
			required: true,
			type: 'NUMBER'
		}
	],
	async run({ interaction, options, bot, guild }) {
		let messages = interaction.options.getNumber('messages');
		if (messages > 100) messages = 100;
		const fetch = await interaction.channel.messages.fetch({ limit: messages });
		const deletedMessages = await interaction.channel.bulkDelete(fetch, true);

		const msg = await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor(bot.config.colors.green)
					.setDescription(`Purged ${deletedMessages.size} messages from ${interaction.channel}`)
			],
			fetchReply: true
		});

		await sleep(5000);

		if (msg?.deletable) await msg.delete();
	}
};
