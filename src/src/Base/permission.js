const { Message, MessageEmbed } = require("discord.js");
const { Bot } = require("../Structures/Client");

/**
 *
 * @param { String } of
 * @param { Message } message
 * @param { Array } permissions
 */
async function checkPermission(of, message, permissions) {
	//checking
	if (!of || !message || !permissions)
		throw new Error("Unable to access of/message/permissions");

	/**
	 * @type { Bot }
	 */
	const client = message.client;

	switch (of.toLowerCase()) {
		case "client":
			//embed
			let cEmbed = new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.avatarURL({ dynamic: true })
				)
				.setColor(client.config.Embed.Error)
				.setFooter(
					client.config.Embed.footer,
					client.user.avatarURL({ dynamic: true })
				)
				.setDescription(
					`${client.config.Embed.Denied} **Bot needs some permissions to executive the command**`
				);

			//array
			let array = [];

			//looping each permissions
			permissions.forEach((permission) => {
				//checking permission
				if (!message.guild.me.hasPermission(permission)) {
					//pushing to array
					array.push(permission);
				}
			});

			//if it includes administrator
			if (array.length && array.includes("ADMINISTRATOR")) {
				cEmbed.addField(
					`${config.Embed.Stuck} Missing Permission(s)`,
					`\`ADMINISTRATOR\``
				);
				message.channel.send({ embeds: [cEmbed] }).catch(() => {});
				return true;
			}

			//if not includes administrator
			else if (array.length) {
				cEmbed.addField(
					`${client.config.Embed.Stuck} Missing Permission(s)`,
					`\`${array.join(" , ")}\``
				);
				message.channel.send({ embeds: [cEmbed] }).catch(() => {});
				return true;
			}
			break;

		//case member
		case "member":
			let mEmbed = new MessageEmbed()
				.setAuthor(
					message.author.tag,
					message.author.avatarURL({ dynamic: true })
				)
				.setColor(client.config.Embed.Error)
				.setFooter(
					client.config.Embed.footer,
					client.user.avatarURL({ dynamic: true })
				)
				.setDescription(
					`${client.config.Embed.Denied} **You don't have enough permissions to use this command!**`
				);

			//array
			let mArray = [];

			//looping permissions
			permissions.forEach((permission) => {
				if (!message.member.hasPermission(permission)) {
					//pushing to array
					mArray.push(permission);
				}
			});

			//if includes administrator
			if (mArray.length && mArray.includes("ADMINISTRATOR")) {
				mEmbed.addField(
					`${client.config.Embed.Stuck} Missing Permission(s)`,
					`\`ADMINISTRATOR\``
				);
				message.channel.send({ embeds: [mEmbed] }).catch(() => {});
				return true;
			}

			//if not includes administrator
			else if (mArray.length) {
				mEmbed.addField(
					`${client.config.Embed.Stuck} Missing Permission(s)`,
					`\`${mArray.join(" , ")}\``
				);
				message.channel.send({ embeds: [mEmbed] }).catch(() => {});
				return true;
			}
			break;
	}
}

module.exports = {
	checkPermission,
};
