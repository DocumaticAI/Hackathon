const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
} = require('discord.js');
const { getRandomString } = require('../../Structures/Utils');
const Schema = require('../../Models/Embed');

//@ts-check

module.exports = {
	commandName: 'embedcreator',
	description: 'Create and post embeds',
	async run({ interaction, bot }) {
		if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
			return interaction.editReply(
				"You don't have permissions to make an embed"
			);

		let Author = false;
		let Thumbnail = false;
		let Image = false;
		let Description = false;
		let Footer = false;
		const rows = [
			new MessageActionRow().addComponents([
				new MessageSelectMenu()
					.setCustomId('embed-menu')
					.setPlaceholder(`Select an option`)
					.addOptions([
						{
							label: 'Author',
							description: 'Author text for embed.',
							value: 'embed-author',
						},
						{
							label: 'Thumbnail',
							description: 'Thumbnail image URL for embed.',
							value: 'embed-thumbnail',
						},
						{
							label: 'Image',
							description: 'Image URL for embed.',
							value: 'embed-image',
						},
						{
							label: 'Color',
							description: 'Hex color code for embed.',
							value: 'embed-color',
						},
						{
							label: 'Description',
							description: 'Description text for embed.',
							value: 'embed-description',
						},
						{
							label: 'Footer',
							description: 'Footer text for embed.',
							value: 'embed-footer',
						},
						{
							label: 'Timestamp',
							description: 'Timestamp boolean for embed.',
							value: 'embed-timestamp',
						},
					]),
			]),
			new MessageActionRow().addComponents(
				new MessageButton()
					.setLabel('Save and Exit')
					.setCustomId('button-save')
					.setStyle('PRIMARY')
			),
		];

		const preview = new MessageEmbed()
			.setColor('#2e3137')
			.setDescription('Preview of Embed');
		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor({ name: 'Embed Creation' })
			.setThumbnail(bot.user.displayAvatarURL())
			.setDescription(
				'Embed Creation\n\nCreate embeds, save them and send them in guild\n\nSelect an option from the dropdown menu.'
			);

		const msg = await interaction.reply({
			embeds: [preview, embed],
			components: rows,
			fetchReply: true,
		});

		const collector = await msg.createMessageComponentCollector({
			time: 1000 * 60 * 3,
		});

		collector.on('collect', async (i) => {
			if (i.user.id !== interaction.user.id)
				return await i.reply({
					content: `These components are not for you.`,
					ephemeral: true,
				});

			if (i.isSelectMenu()) {
				if (i.values.includes('embed-author')) {
					await i.reply({
						content: `Provide text for embed author.`,
						ephemeral: true,
					});
					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});

					let author = await collect.first().content;
					if (author.length > 256) author = author.slice(0, 253) + '...';

					preview.setAuthor({ name: author });
					Author = true;
				} else if (i.values.includes('embed-thumbnail')) {
					await i.reply({
						content: `Provide image URL for embed thumbnail.`,
						ephemeral: true,
					});

					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});

					const thumbnail = await collect.first().content;
					const regex =
						/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
					if (!regex.test(thumbnail))
						return await i.followUp({
							content: `Invalid image URL was provided.`,
							ephemeral: true,
						});

					preview.setThumbnail(thumbnail);
					Thumbnail = true;
				} else if (i.values.includes('embed-image')) {
					await i.reply({
						content: `Provide image URL for embed image.`,
						ephemeral: true,
					});
					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});
					const image = collect.first().content;
					const regex =
						/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
					if (!regex.test(image))
						return await i.followUp({
							content: `Invalid image URL was provided.`,
							ephemeral: true,
						});

					preview.setImage(image);
					Image = true;
				} else if (i.values.includes('embed-color')) {
					await i.reply({
						content: `Provide a hexadecimal color code for embed color.`,
						ephemeral: true,
					});
					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});
					let color = await collect.first().content;
					if (!color.startsWith('#')) color = '#' + color;
					regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
					if (!regex.test(color))
						return await i.followUp(
							'Hexadecimal color code provided is invalid, default invisible embed color will be used.'
						);
					preview.setColor(color);
				} else if (i.values.includes('embed-description')) {
					await i.reply({
						content: `Provide text for embed description.`,
						ephemeral: true,
					});

					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});

					let description = await collect.first().content;
					if (description.length > 4096)
						description = description.slice(0, 4093) + '...';

					preview.setDescription(description);
					Description = true;
				} else if (i.values.includes('embed-footer')) {
					await i.reply({
						content: `Provide text for embed footer.`,
						ephemeral: true,
					});
					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});
					let footer = await collect.first().content;
					if (footer.length > 4096) footer = footer.slice(0, 4093) + '...';

					preview.setFooter({ text: footer });
					Footer = true;
				} else if (i.values.includes('embed-timestamp')) {
					await i.reply({
						content: `Are you sure you want to add timestamp to this embed? You can't undo this.\nIf yes, then reply to this message with \`yes\` else timestamp won't be applied.`,
						ephemeral: true,
					});
					const filter = (m) => m.author.id === interaction.user.id;
					const collect = await interaction.channel.awaitMessages({
						filter: filter,
						max: 1,
					});
					const answer = await collect.first().content;
					if (['yes', 'ye', 'yeah', 'true'].includes(answer?.toLowerCase())) {
						preview.setTimestamp();
					}
				}
				return await msg.edit({
					embeds: [preview, embed],
				});
			}
			if (
				Author === false ||
				Thumbnail === false ||
				Image === false ||
				Description === false ||
				Footer === false
			)
				return await i.reply({
					content: `You can't send an empty embed`,
					ephemeral: true,
				});

			const embedID = getRandomString(5);
			const schema = Schema.findOne({
				GuildID: interaction.guild.id,
				EmbedID: embedID,
			});
			if (!schema) {
				schema = new Schema({
					GuildID: interaction.guild.id,
					EmbedID: embedID,
				}).save();
			}
			msg.edit({
				embeds: [
					new MessageEmbed()
						.setColor('BLURPLE')
						.setAuthor({ name: 'Embed Creation' })
						.setThumbnail(bot.user.displayAvatarURL())
						.setDescription(
							`Embed has been saved!\nTo send embed, use the \`/embedsend embedid: ${embedID}\` command.`
						),
				],
				components: [],
			});
		});
	},
};
