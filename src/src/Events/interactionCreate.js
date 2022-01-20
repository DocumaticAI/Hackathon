const { ButtonInteraction, MessageEmbed } = require("discord.js");
const { Bot } = require("../Structures/Client");

/**
 * @param {Bot} client
 * @param {ButtonInteraction} interaction
 */

module.exports = async (client, interaction) => {
	let member = interaction.member;
	let Database = await client.User.findOne({
		guild: interaction.guild.id,
		user: member.id,
	});

	//if no database
	if (!Database || !Database.messages) {
		Database = {
			messages: 0,
		};
	} else {
		//if database
		Database.messages = Database.messages;
	}

	//fetching leaderboard
	let Leaderboard = await client.User.find({ guild: interaction.guild.id })
		.sort([["messages", "Descending"]])
		.exec();

	//User position in leaderboard
	let Position = Leaderboard.findIndex((Member) => Member.user === member.id);
	if (interaction.customId === "check-messages") {
		interaction.reply({
			embeds: [
				new MessageEmbed()
					.setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
					.setFooter(
						client.config.Embed.footer,
						client.user.avatarURL({ dynamic: true })
					)
					.setDescription(`Showing information of ${member.user.tag}`)
					.addField(`✉ Messages`, `**${Database.messages}**`, true)
					.addField(`🎖 Position`, `**${Position + 1 || "Unknown"}**`, true)
					.setColor(member.displayColor || client.config.Embed.Color),
			],
			ephemeral: true,
		});
	}
};
