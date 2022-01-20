const { Message } = require("discord.js");
const addMessages = require("../Base/message");
const { Bot } = require("../Structures/Client");

/**
 *
 * @param { Bot } client
 * @param { Message } message
 */
module.exports = async (client, message) => {
	if (!message.guild || message.author.bot) return;

	const { config } = client;

	if (message.content.toLowerCase().startsWith(config.prefix)) {
		if (message.content === config.prefix) {
			await addMessages(client, message);
			return;
		}
		let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		let cmd = args.shift().toLowerCase();

		let command =
			client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

		if (!command) await addMessages(client, message);

		if (command) command.run(client, message, args).catch(() => {});
	} else {
		addMessages(client, message);
	}
};
