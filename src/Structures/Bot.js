const { Client, Collection } = require('discord.js');
const consola = require('consola');
require('dotenv').config();

module.exports = class Bot extends Client {
	constructor(config) {
		super(config.botOptions);
		this.config = config;
		this.utils = new Utils();
		this.commands = new Collection();
		this.logger = consola;
	}

	async start() {
		await this.loadOperations();
		await this.login(process.env.TOKEN);
	}

	async loadOperations() {
		const commands = await this.utils.search(
			`${__dirname}/../Commands/**/*{.js}`
		);
		commands.forEach((commandName) => {
			const command = require(commandName);
			this.commands.set(commandName, command);
		});

		const events = await this.utils.search(
			`${__dirname}/../Commands/**/*{.js}`
		);
		events.forEach((eventName) => {
			const event = require(eventName);
			this.on(event.event, event.run.bind(null, this));
		});
	}
};
