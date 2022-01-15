const {
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
} = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Get some help!',
	category: 'Info',
	async run({ interaction, bot }) {
		const set = new Set();
		bot.commands.forEach((cmd) => set.add(cmd.category));
		const categories = [...set.values()];

		const home = {
			embeds: [
				new MessageEmbed()
					.setDescription(
						categories
							.map(
								(category) =>
									`**${category}**\n${bot.commands
										.filter((cmd) => cmd.category === category)
										.map((cmd) => `\`${cmd.name}\``)
										.join(', ')}`
							)
							.join('\n')
					)
					.setColor('BLURPLE'),
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageSelectMenu()
						.setPlaceholder('Help Select Menu')
						.setCustomId('Help-Select-Menu')
						.addOptions(
							categories.map((category) => {
								return {
									label: category,
									value: category,
									description: `The ${category} commands.`,
									emoji: '📜',
								};
							})
						)
				),
			],
		};

		const homeButton = {
			name: 'Home',
			description: 'Go back to the main menu.',
			emoji: '🏠',
		};

		const m = await interaction.reply({
			...home,
			fetchReply: true,
		});

		const collector = m.createMessageComponentCollector({
			time: 1000 * 60 * 3,
		});

		collector.on('collect', async (i) => {
			if (i.user.id !== interaction.user.id)
				return await i.reply({
					embeds: [
						new MessageEmbed()
							.setColor('RED')
							.setDescription("That's not meant for you!"),
					],
					ephemeral: true,
				});
			const val = i.values[0];
			// It's a category, otherwise a command or home
			if (val === 'home') return await i.update(home);
			if (categories.includes(val))
				return await i.update({
					embeds: [
						new MessageEmbed().setDescription('ooga booga').setColor('BLURPLE'),
					],
					components: [
						new MessageActionRow().addComponents(
							new MessageSelectMenu()
								.setPlaceholder('Commands and Help Select Menu')
								.setCustomId('Commands-and-help-select-menu')
								.addOptions(
									bot.commands
										.filter((cmd) => cmd.category === val)
										.map((cmd) => {
											return {
												label: cmd.name,
												value: cmd.name,
												description: cmd.description,
												emoji: '🔧',
											};
										})
										.push(homeButton)
								)
						),
					],
				});
			const cmd = bot.commands.get(val);

			await i.update({
				embeds: [
					new MessageEmbed()
						.setDescription(
							`
**Name:** ${cmd.name}
**Category:** ${cmd.category}
**Syntax:** \`/${cmd.name}${
								cmd.options
									? ` ${cmd.options
											.map((option) =>
												option.required
													? `<${option.name}>`
													: `[${option.name}]`
											)
											.join(' ')}`
									: ''
							}\`
        `
						)
						.setColor('BLURPLE'),
				],
				components: [
					new MessageActionRow().addComponents(
						new MessageSelectMenu()
							.setPlaceholder('Category and Help Select Menu')
							.setCustomId('Category-and-help-command-menu')
							.addOptions([
								homeButton,
								{
									label: cmd.category,
									value: cmd.category,
									description: `The ${cmd.category} commands`,
									emoji: '📜',
								},
							])
					),
				],
			});
		});
	},
};
