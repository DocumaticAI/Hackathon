const { MessageActionRow, MessageButton } = require('discord.js');
const { promisify } = require('util');
const glob = require('glob');

module.exports = {
	getRandomString: length => {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
			result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
		}
		return result;
	},
	search: promisify(glob),
	sleep: promisify(setTimeout),
	pretty: str => str[0].toUpperCase() + str.slice(1).toLowerCase(),
	plural: num => (num === 1 ? '' : 's'),
	confirm: async (interaction, embed) => {
		const msg = await interaction.reply({
			embeds: [embed],
			components: [
				new MessageActionRow().addComponents(
					new MessageButton().setCustomId('proceed').setStyle('SUCCESS').setLabel('Proceed'),
					new MessageButton().setCustomId('cancel').setStyle('DANGER').setLabel('Cancel')
				)
			],
			fetchReply: true
		});

		const i = await msg
			.awaitMessageComponent({ time: 1000 * 60, filter: i => i.user.id === interaction.user.id })
			.catch(() => null);
		if (!i)
			return {
				proceed: false,
				reason: 'Reason: Inactivity Timeout',
				i
			}; //brb ok

		if (i.customId === 'proceed')
			return {
				proceed: true,
				i
			};
		return {
			proceed: false,
			i
		};
	}
};
