const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

require('dotenv').config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help menu of the bot'),
	async execute(interaction) {
     const embed = new MessageEmbed()
        .setTitle("LeBot's Help Menu")
        .setDescription(`LeBot is a bot that can be used to generate AI-based stories and other fun stuff like nudity detecton, tone detection, analysis and more!`)
        .setColor('GREEN')
        .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
        .addField(`Important Links`, `[Invite Bot](https://discord.com/oauth2/authorize?client_id=${process.env.BOT_CLIENT_ID}&scope=+applications.commands+bot&permissions=412317240384)`)
        .addField(`Commands`, `You can use the following commands to interact with the bot:`)
        .addField(`/story`, `Generate a story.`)
        .addField(`/isnsfw`, `Know if an image contains nudity or not.`)
        .addField(`/beta`, `Hop into Beta mode. (This will allow you to use the bot while in beta.)`)
        .addField(`/chatbot`, `Chat with an AI-based chatbot.`)
        .addField(`/colorize`, `Turn any black and white image into a colored one!`)
        .addField(`/highres`, `Turn any low-res image into a high-res one!`)
        .addField(`/sentiment`, `Analyze the sentiment of a text.`)
        .addField(`/help`, `This menu.`)
        .setFooter({text: "LeBot v1"})

        return await interaction.editReply({
            embeds: [embed]
        });
	},
};