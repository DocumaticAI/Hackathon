const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	MessageSelectMenu,
} = require('discord.js');
const { getRandomString } = require('../../Structures/Utils');
const Schema = require('../../Models/Embed');
module.exports = {
	commandName: 'embedcreator',
	description: 'Create and post embeds',
	async run({ interaction, options, bot }) {
		if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
			interaction.editReply("You don't have permissions to make an embed");
		} else {
			let Author = false;
			let Thumbnail = false;
			let Image = false;
			let Description = false;
			let Footer = false;
			const row = new MessageActionRow().addComponents([
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
				new MessageButton()
					.setLabel('Save and Exit')
					.setCustomId('button-save')
					.setStyle('PRIMARY'),
			]);
			const preview = new MessageEmbed().setColor('#2e3137');
			const embed = new MessageEmbed()
				.setColor('Blurple')
				.setAuthor({ name: 'Embed Creation' })
				.setThumbnail(bot.user.displayAvatarURL())
				.setDescription(
					'Embed Creation\n\nCreate embeds, save them and send them in guild\n\nSelect an option from the dropdown menu.'
				);
			interaction
				.followUp({
					embeds: [preview, embed],
					components: [row],
					fetchReply: true,
				})
				.then(async (msg) => {
					let collector = await msg.createMessageComponentCollector({
						filter: (fn) => fn,
						time: 1000 * 60 * 3,
					});
					collector.on('collect', async (i) => {
						if (i.user.id !== interaction.user.id) {
							return i.reply({
								content: `These components are not for you.`,
								ephemeral: true,
							});
						} else {
							if (i.isSelectMenu()) {
								if (i.values.includes('embed-author')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Provide text for embed author.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									let author = await collect.first().content;
									if (author.length > 256) {
										author = author.slice(0, 253) + '...';
									}
									preview.setAuthor({ name: author });
									Author = true;
								} else if (i.values.includes('embed-thumbnail')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Provide image URL for embed thumbnail.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									const thumbnail = await collect.first().content;
									let regex =
										/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
									if (regex.test(thumbnail)) {
										preview.setThumbnail(thumbnail);
										Thumbnail = true;
									} else {
										i.followUp({
											content: `Invalid image URL was provided.`,
											ephemeral: true,
										});
									}
								} else if (i.values.includes('embed-image')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Provide image URL for embed image.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									const image = await collect.first().content;
									let regex =
										/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
									if (regex.test(image)) {
										preview.setImage(image);
										Image = true;
									} else {
										i.followUp({
											content: `Invalid image URL was provided.`,
											ephemeral: true,
										});
									}
								} else if (i.values.includes('embed-color')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Provide a hexadecimal color code for embed color.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									const color = await collect.first().content;
									if (!color.startsWith('#')) {
										color = '#' + color;
									}
									regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
									if (regex.test(color)) {
										preview.setColor(color);
									} else {
										interaction.followUp(
											'Hexadecimal color code provided is invalid, default invisible embed color will be used.'
										);
									}
								} else if (i.values.includes('embed-description')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Provide text for embed description.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									let description = await collect.first().content;
									if (description.length > 4096) {
										description = description.slice(0, 4093) + '...';
									}
									preview.setDescription(description);
									Description = true;
								} else if (i.values.includes('embed-footer')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Provide text for embed footer.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									let footer = await collect.first().content;
									if (footer.length > 4096) {
										footer = footer.slice(0, 4093) + '...';
									}
									preview.setFooter({ text: footer });
									Footer = true;
								} else if (i.values.includes('embed-timestamp')) {
									await i.deferUpdate().catch((e) => {});
									i.followUp({
										content: `Are you sure you want to add timestamp to this embed? You can't undo this.\nIf yes, then reply to this message with \`yes\` else timestamp won't be applied.`,
										ephemeral: true,
									});
									let filter = (m) => m.author.id === interaction.user.id;
									let collect = await interaction.channel.awaitMessages({
										filter: filter,
										max: 1,
									});
									const answer = await collect.first().content;
									if (answer === 'yes' || answer === 'Yes') {
										preview.setTimestamp();
									}
								}
							} else if (i.isButton()) {
								if (i.customId === 'button-save') {
									if (
										Author === false &&
										Thumbnail === false &&
										Image === false &&
										Description === false &&
										Footer === false
									) {
										i.followUp({
											content: `You can't send an empty embed`,
											ephemeral: true,
										});
									} else {
										const embedID = getRandomString(5);
										let schema = Schema.findOne({
											GuildID: interaction.guild.id,
											EmbedID: embedID,
										});
										if (!schema) {
											schema = {
												GuildID: interaction.guild.id,
												EmbedID: embedID,
											};
										}
										const saved = new MessageEmbed()
											.setColor('Blurple')
											.setAuthor({ name: 'Embed Creation' })
											.setThumbnail(bot.user.displayAvatarURL())
											.setDescription(
												`Embed has been saved!\nTo send embed, use the \`/embedsend embedid: ${embedID}\` command.`
											);
										msg.edit({
											embeds: [saved],
											components: [],
										});
									}
								}
							}
						}
					});
				});
		}
	},
};
