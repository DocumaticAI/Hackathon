const {
	MessageEmbed,
	MessageActionRow,
	MessageSelectMenu,
} = require('discord.js');

module.exports = {
	commandName: 'help',
	description: 'Get some help!',
	async run({ interaction, bot }) {
		const set = new Set();
		bot.commands.forEach((cmd) => set.add(cmd.category));
		const categories = [...set.values()];

		const home = {
			embeds: [
				new MessageEmbed().setDescription(
					categories.map(
						(category) =>
							`**${category}**\n${bot.commands
								.filter((cmd) => cmd.category === category)
								.map((cmd) => `\`${cmd.commandName}\``)
								.join(', ')}`
					)
				),
			],
			components: [
				new MessageActionRow().addComponents(
					new MessageSelectMenu().addOptions([
						categories.map((category) => {
							return {
								label: category,
								value: category,
								emoji: '📜',
							};
						}),
					])
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
					embeds: [],
					components: [
						new MessageActionRow().addComponents(
							new MessageSelectMenu().addOptions([
								...bot.commands
									.filter((cmd) => cmd.category === val)
									.map((cmd) => {
										return {
											name: cmd.commandName,
											description: cmd.description,
											emoji: '🔧',
										};
									}),
								home,
							])
						),
					],
				});
			const cmd = bot.commands.get(val);

			await i.update({
				embeds: [
					new MessageEmbed().setDescription(`
**Name:** ${cmd.commandName}
**Category:** ${cmd.category}
**Syntax:** \`/${cmd.commandName}${
						cmd.options
							? ` ${cmd.options
									.map((option) =>
										option.required ? `<${option.name}>` : `[${option.name}]`
									)
									.join(' ')}`
							: ''
					}\`
        `),
				],
				components: [
					new MessageActionRow().addComponents(
						new MessageSelectMenu().addOptions([
							home,
							{
								name: cmd.category,
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
