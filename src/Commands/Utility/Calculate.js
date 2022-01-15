const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
module.exports = {
	commandName: 'calculate',
	description: 'Calculate and solve equations',
	options: [
		{
			name: 'equation',
			description: 'Specify an equation.',
			required: true,
			type: 'STRING',
		},
	],
	async run({ interaction, bot }) {
		const equation = interaction.options.getString('equations');
		try {
			let result = match.evaluate(equation);
		} catch (err) {
			await interaction.reply('Invalid Equation');
		}

		await interaction.reply({
			embeds: [
				new MessageEmbed()
					.setColor('BLURPLE')
					.addField('Your Equation', ${equation}`
					.addField('Solution', result,,
			],
		});
	},
};
