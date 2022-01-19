const Eris = require('eris');
const Event = require('../Structures/EventBase');
const ms = require('ms');

module.exports = class extends Event {

	async run(interaction) {
		if(interaction instanceof Eris.CommandInteraction) {

			if (!interaction.guildID) return;
			try {
				const command = this.client.interactions.get(interaction.data.name);
				if (!command) return;

				const timestamps = this.client.cooldowns.get(command.name);

				if (timestamps.has(interaction.member.user.id)) {
					const expirationTime = timestamps.get(interaction.member.user.id) + this.client.config.cooldowns[command.name];
					if (Date.now() < expirationTime) {
						const timeLeft = ms((timestamps.get(interaction.member.id) + this.client.config.cooldowns[command.name]) - Date.now());
						await interaction.acknowledge();
						return interaction.createFollowup({ content: `⏰ | This command is on cooldown for \`${timeLeft}\``, flags: 64 });
					}
				}

				this.client.emit('command', interaction);

				await timestamps.set(interaction.member.user.id, Date.now());
				setTimeout(async () => await timestamps.delete(interaction.member.user.id), this.client.config.cooldowns[command.name]);

				if(!interaction.options) return await command.run(interaction, this.client);


				await command.run(
					interaction,
					interaction.options._options.map((value) => value.value),
				);
			}
			catch (err) {
				this.client.createMessage(interaction.channel.id, {
					content: 'Something went wrong!',
					ephemeral: true,
				});

				console.error(err);
				// console.minor(`Error catched: ${err}`);
			}
		}

	}
};