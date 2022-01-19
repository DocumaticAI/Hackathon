const { Client } = require('eris');
const Utils = require('./BotUtils.js');
const AcoliumDatabase = require('./BotDatabase');
const config = require('./BotConfig');

module.exports = class BotClient extends Client {
	constructor(options = config) {
		// options.token = config.devMode === true ? process.env.TOKEN_DEV : process.env.TOKEN;

		super(process.env.TOKEN, { restMode: true });

		this.validate(options);

		this.interactions = new Map();
		this.devMode = true;
		this.events = new Map();
		this.utils = new Utils(this);
		this.cooldowns = new Map();
		this.config = config;

		this.db = new AcoliumDatabase();
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		this.token = options.token;
		this.prefix = options.prefix;
		this.developers = options.developers;
		this.devMode = options.devmode;

	}

	async connect() {
		require('events').EventEmitter.defaultMaxListeners = 0;

		this.utils.loadEvents()
			.then(console.log(
				'---------------================================------------------\n' +
				'---------------           EVENTS DONE          ------------------\n',
			))
			.catch(console.error);
		this.db.loadDatabase()
			.then(console.log(
				'---------------================================------------------\n' +
				'---------------           DATABASE DONE          ------------------\n',
			))
			.catch(console.error);
		this.utils.loadProperties()
			.then(console.log(
				'---------------================================------------------\n' +
				'---------------        PROPERTIES DONE          ------------------\n',
			))
			.catch(console.error);
		await super.connect();
	}
};