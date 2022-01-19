const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

module.exports = class Utilities {
	constructor(client) {
		this.client = client;
	}
	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	async loadInteractions() {
		const interactions = await glob(`${this.directory}/Commands/**/*.js`);

		for (const interactionFile of interactions) {
			delete require.cache[interactionFile];
			const { name } = path.parse(interactionFile);
			const File = require(interactionFile);
			const interaction = new File(this.client, name.toLowerCase());

			this.client.interactions.set(interaction.name, interaction);
			this.client.cooldowns.set(interaction.name, new Map());

			this.client.config.devMode === true ? this.client.createGuildCommand('881813009876520980', interaction) : this.client.createCommand(interaction);
		}
	}

	async loadEvents() {
		const events = await glob(`${this.directory}/Events/*.js`);
		for (const eventFile of events) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(eventFile);
			const event = new File(this.client, name);

			this.client.events.set(event.name, event);
			event.emitter[event.type](name, (...args) => event.run(...args));

		}
	}

	async loadProperties() {
		const properties = require('../Custom/properties');

		properties;
	}

	/**
	 * @param {object} options - The options needed for the collector.
	 */
	async createInteractionCollector(options) {
		const dir = require('../Custom/interactionCollector');
		return dir.collectInteractions(options);
	}

	/**
	 * @param {number} percentage - The percentage
	 */
	// emojifiedPercentage(percentage) {
	// 	if(percentage < 10) return '<:bar_start_empty:927529245310349322><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 20) return '<:bar_start_mid:927529245377437766><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 30) return '<:bar_start_full:927529245239029851><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 40) return '<:bar_start_full:927529245239029851><:bar_mid_mid:927529245251624970><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 50) return '<:bar_start_full:927529245239029851><:bar_mid_full:927529245029335081><:bar_mid_empty:927529245243224094><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 60) return '<:bar_start_full:927529245239029851><:bar_mid_full:927529245029335081><:bar_mid_mid:927529245251624970><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 70) return '<:bar_start_full:927529245239029851><:bar_mid_full:927529245029335081><:bar_mid_full:927529245029335081><:bar_mid_empty:927529245243224094><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 80) return '<:bar_start_full:927529245239029851><:bar_mid_full:927529245029335081><:bar_mid_full:927529245029335081><:bar_mid_mid:927529245251624970><:bar_end_empty:927529245268377720>';
	// 	else if(percentage < 90) return '<:bar_start_full:927529245239029851><:bar_mid_full:927529245029335081><:bar_mid_full:927529245029335081><:bar_mid_full:927529245029335081><:bar_end_empty:927529245268377720> ';
	// 	else return '<:bar_start_full:927529245239029851><:bar_mid_full:927529245029335081><:bar_mid_full:927529245029335081><:bar_mid_full:927529245029335081><:bar_end_full:927529245243211776>';
	// }

	randomHex() {
		return Math.floor(Math.random() * (0xffffff + 1));
	}

	generateField() {
		const tree = { now: 0, expected: 6 };
		const stone = { now: 0, expected: 3 };
		const water = { now: 0, expected: 9 };
		const mushroom = { now: 0, expected: 2 };
		const campfire = { now: 0, expected: 1 };
		const chest = { now: 0, expected: 1 };
		const hero = { now: 0, expected: 1 };

		const grass = this.getEmojis().grass;

		let i = 0;

		const field = [
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
			[grass, grass, grass, grass, grass, grass, grass, grass],
		];

		function chooseLocation() {
			const location = Math.floor(Math.random() * field.length);
			const location2 = Math.floor(Math.random() * field.length);
			return { location, location2 };
		}

		while(i !== 23) {
			i++;

			let locations = chooseLocation();

			// TREES
			if(tree.now < tree.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				tree.now++;

				field[locations.location][locations.location2] = this.getEmojis().tree;
			}
			else

			// MUSHROOMS
			if(mushroom.now < mushroom.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				mushroom.now++;

				const mushrooms = Math.floor(Math.random() * 100) <= 50 ? 'mushroom1' : 'mushroom2';
				field[locations.location][locations.location2] = this.getEmojis()[mushrooms];
			}
			else

			// CAMPFIRE
			if(campfire.now < campfire.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				campfire.now++;

				field[locations.location][locations.location2] = this.getEmojis().campfire;
			}
			else

			// CHEST
			if(chest.now < chest.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				chest.now++;

				field[locations.location][locations.location2] = this.getEmojis().chest;
			}
			else

			// HERO
			if(hero.now < hero.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				if(locations.location === 7 || locations.location === 0) locations = chooseLocation();
				if(locations.location2 === 7 || locations.location2 === 0) locations = chooseLocation();
				hero.now++;

				field[locations.location][locations.location2] = this.getEmojis().idle_down;
			}

			else
			// WATER
			if(water.now < water.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				water.now++;

				field[locations.location][locations.location2] = this.getEmojis().water;
			}
			else

			// STONES
			if(stone.now < stone.expected) {
				if(field[locations.location][locations.location2] !== grass) locations = chooseLocation();
				stone.now++;

				const rocks = Math.floor(Math.random() * 100) <= 50 ? 'rock1' : 'rock2';
				field[locations.location][locations.location2] = this.getEmojis()[rocks];
			}
		}
		return field;
	}

	/**
	 *
	 * @param {Object} data - The data.
	 * @param {String} item - The item to spawn.
	 */
	spawnItem(data, item) {
		const location = Math.floor(Math.random() * data.Field.length);
		const location2 = Math.floor(Math.random() * data.Field.length);

		data.Field[location][location2] = this.getEmojis()[item];
	}

	getEmojis() {
		return {
			// FIELD EMOJIS SELECTION
			house: '<:house:931191833739022336>',
			chest: '<:chest:931606480472379422>',
			grass: '<:grass:931608637909123072>',
			rock1: '<:rock:931606561229533185>',
			rock2: '<:rock2:931606585791381504>',
			tree: '<:tree:931606406317097031>',
			water: '<:water:931592982216450058>',
			mushroom1: '<:mushroom1:931606511208255498>',
			mushroom2: '<:mushroom2:931606511220826142>',
			campfire: '<a:campfire:931606373127561336>',

			// ANIMATIONS SELECTION
			idle_up: '<a:idle_up:931898282928664616>',
			idle_down: '<a:idle_down:931898283243212809>',
			idle_right: '<a:idle_right:931898304034377748>',
			idle_left: '<a:idle_left:931898283515842570>',
			//
			chop_up: '<a:chop_up:932189284298006538>',
			chop_down: '<a:chop_down:932244313474224168>',
			chop_right: '<a:chop_right:932189283928932382>',
			chop_left: '<a:chop_left:932189284902006794>',
			//
			mining_up: '<a:mining_up:933001837102125056>',
			mining_down: '<a:mining_down:933005504828035092>',
			mining_right: '<a:mining_right:933005677335560202>',
			mining_left: '<a:mining_left:933001836833685604>',

			// EMOJIS FOR COMPONENTS SELECTION
			axe: '931909340242268200',
			pickaxe: '931926127491035186',
			mushroom: '931960447769382982',
			opened_chest: '932195127869440030',

			// EMOJIS FOR BACKPACK SELECTION
			Gold: '<:gold_item:932205933122170900>',
			GoldenEgg: '<:goldenegg_item:932205932715327489>',
			Wood: '<:log_item:932205933231226910>',
			Mushroom: '<:mushroom_item:932205932836974673>',
			Stone: '<:rock_item:932205933373833276>',
		};
	}

	randomizeArray(array) {
		return array
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	}

	indexOfEnchanted(array, indexOfWhat) {
		for(let i = 0; i < array.length; i++) {
			if(array[i].includes(indexOfWhat)) return [i, array[i].indexOf(indexOfWhat)];
		}
	}

	smallNumbers(num) {
		return String(num)
			.replace(/0/gi, '⁰')
			.replace(/1/gi, '¹')
			.replace(/2/gi, '²')
			.replace(/3/gi, '³')
			.replace(/4/gi, '⁴')
			.replace(/5/gi, '⁵')
			.replace(/6/gi, '⁶')
			.replace(/7/gi, '⁷')
			.replace(/8/gi, '⁸')
			.replace(/9/gi, '⁹');
	}

	chooseRandomItem() {
		const randomChance = Math.floor(Math.random() * 100) + 1;

		const items = [
			{ min: 1, max: 10, item: 'chest' },
			{ min: 10, max: 40, item: 'mushroom1' },
			{ min: 40, max: 80, item: 'rock1' },
			{ min: 80, max: 100, item: 'tree' },
		];
		let item;

		for (let i = 0; i < items.length; i++) {
			if (randomChance >= items[i].min && randomChance <= items[i].max) {
				item = items[i].item;
			}
		}

		return item;
	}
};