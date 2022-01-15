const { Client, Collection } = require('discord.js');
const { search } = require('./Utils');
const consola = require('consola');
require('dotenv').config();

module.exports = class Bot extends Client {
	constructor(config) {
		super(config.botOptions);
		this.config = config;
		this.commands = new Collection();
		this.logger = consola;
	}

	async start() {
		await this.loadOperations();
		await this.login(process.env.TOKEN);

		const guild = this.guilds.cache.get(this.config.guildId);
		await guild.commands.set(
			this.commands.map((command) => {
				return {
					name: command.commandName,
					description: command.description,
					options: command.options,
				};
			})
		);
	}

	async loadOperations() {
		const commands = await search(`${__dirname}/../Commands/**/*.js`);
		commands.forEach((commandName) => {
			const command = require(commandName);
			this.commands.set(command.commandName, command);
		});

		const events = await search(`${__dirname}/../Events/*.js`);
		events.forEach((eventName) => {
			const event = require(eventName);
			this.on(event.event, event.run.bind(null, this));
		});
	}
};
