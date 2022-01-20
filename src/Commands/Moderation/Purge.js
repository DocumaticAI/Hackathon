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
	async run({ interaction, bot }) {
		let messages = interaction.options.getNumber('messages');
		if (messages > 100 || messages < 1)
			return await interaction.reply(
				'Please specify a number from 1 - 100' //We we're going to do so you could have more than 100 messages but not enough time...
			);
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
