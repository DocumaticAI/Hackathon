const { MessageEmbed, TextChannel } = require("discord.js");
const getMessagesArray = require("../Base/leaderboard");
const { Bot } = require("./Client");

class Leaderboard {
	/**
	 * @param { Bot } client
	 */
	constructor(client) {
		this.client = client;
	}

	async startLeaderboard(method) {
		setInterval(async () => {
			await this.updateLeaderboards(method);
		}, this.client.config.Leaderboard.interval || 300000); // 5 minutes
	}

	async updateLeaderboards(method) {
		let methods = ["edit", "send"];
		if (!method || !methods.includes(method)) method = "send";

		let Guilds = await this.client.Guild.find({});
		Guilds.forEach(async (guild) => {
			let Server = this.client.guilds.cache.get(guild._id);

			if (
				!Server ||
				!guild.Loggers ||
				!guild.Loggers.Leaderboard ||
				!guild.Loggers.Leaderboard.Channel
			)
				return;

			let logChannel = Server.channels.cache.get(
				guild.Loggers.Leaderboard.Channel
			);
			if (!logChannel) return;

			let Leaderboard = await getMessagesArray(this.client, Server);
			if (!Leaderboard.length) return;

			let index = 1;

			const embed = new MessageEmbed()
				.setAuthor(
					Server.name + "'s messages leaderboard",
					Server.iconURL({ dynamic: true })
				)
				.setColor(this.client.config.Embed.Color)
				.setFooter(
					"Next refresh in",
					this.client.user.avatarURL({ dynamic: true })
				)
				.setTimestamp(Date.now() + this.client.config.Leaderboard.interval)
				//mapping the leaderboard
				.setDescription(
					Leaderboard.map(
						(key) =>
							`${this.client.config.Embed.Arrow} \`${index++}\`. ${
								key.User
							}・**${key.Messages}** messages`
					)
				);

			//edit method
			if (method === "edit") {
				if (guild.Loggers.Leaderboard.LastMessage) {
					let fetchedMessage = await this.client.findMessage(
						guild.Loggers.Leaderboard.LastMessage,
						logChannel
					);

					if (!fetchedMessage) {
						let newMessage = await logChannel
							.send({ embeds: [embed] })
							.catch(() => {});

						await this.client.setLastMessage(newMessage);
					} else {
						fetchedMessage.edit({ embeds: [embed] }).catch(() => {});
					}
				} else {
					let newMessage = await logChannel
						.send({ embeds: [embed] })
						.catch(() => {});
					await this.client.setLastMessage(newMessage);
				}
			}

			//send method
			else if (method === "send") {
				if (guild.Loggers.Leaderboard.LastMessage) {
					let fetchedMessage = await this.client.findMessage(
						guild.Loggers.Leaderboard.LastMessage
					);
					if (fetchedMessage) await fetchedMessage.delete().catch(() => {});
				}
				let newMessage = await logChannel
					.send({ embeds: [embed] })
					.catch(() => {});
				await this.client.setLastMessage(newMessage);
			}
		});
	}
}

module.exports = Leaderboard;
