const InteractionBase = require('../../Structures/CommandBase');

module.exports = class PingInteraction extends InteractionBase {
	constructor(...args) {
		super(...args, {
			name: 'start',
			description: 'Wanna load into the game?',
			cooldown: 6000,
		});
	}
	/**
   * @param {Interaction} interaction
   * @param {Client} client
   */
	async run(interaction) {
		await interaction.acknowledge(64);

		const data = await this.client.db.findUser(interaction.member.id);

		if(data.Saves.length === 0) {
			data.Saves.push(
				{ Backpack: {
					Wood: 0,
					GoldenEgg: 0,
					Mushroom: 0,
					Gold: 0,
					Stone: 0,
				},
				Field: this.client.utils.generateField(),
				Name: 'hello world',
				},
			);

			await this.client.db.forceUpdate({ UserId: interaction.member.id }, data, require('../../Schemas/Users'));
		}

		const customIds = {
			up: String(Math.random()),
			down: String(Math.random()),
			left: String(Math.random()),
			right: String(Math.random()),
			backpack: String(Math.random()),
			playground: String(Math.random()),
		};

		// const gameData = {
		// 	field: data.Saves[0].Field,
		// };


		const client = this.client;
		const emojis = this.client.utils.getEmojis();
		const componentsArray = [{
			type: 1,
			components: [
				{ type: 2, label: '\u200b', custom_id: 'uselessbutton1', style: 2, disabled: true },
				{ type: 2, emoji: {}, label: '\u200b', custom_id: customIds.up, style: 1 },
				{ type: 2, label: '\u200b', custom_id: 'uselessbutton2', style: 2, disabled: true },
				{ type: 2, label: 'Backpack', custom_id: customIds.backpack, style: 3 },
			],
		},
		{
			type: 1,
			components: [
				{ type: 2, emoji: {}, label: '\u200b', custom_id: customIds.left, style: 1 },
				{ type: 2, emoji: {}, label: '\u200b', custom_id: customIds.down, style: 1 },
				{ type: 2, emoji: {}, label: '\u200b', custom_id: customIds.right, style: 1 },
			],
		}];
		let indexOfHero = client.utils.indexOfEnchanted(data.Saves[0].Field, emojis.idle_down);

		if(indexOfHero === undefined) indexOfHero = client.utils.indexOfEnchanted(data.Saves[0].Field, emojis.idle_up);
		if(indexOfHero === undefined) indexOfHero = client.utils.indexOfEnchanted(data.Saves[0].Field, emojis.idle_left);
		if(indexOfHero === undefined) indexOfHero = client.utils.indexOfEnchanted(data.Saves[0].Field, emojis.idle_right);

		let left = data.Saves[0].Field[indexOfHero[0]][indexOfHero[1] - 1];
		let right = data.Saves[0].Field[indexOfHero[0]][indexOfHero[1] + 1];
		let down = data.Saves[0].Field[indexOfHero[0] + 1];
		let up = data.Saves[0].Field[indexOfHero[0] - 1];

		function setButtons() {
			componentsArray[0].components[1].emoji.name = '\u2B06', delete componentsArray[0].components[1].emoji.id;
			componentsArray[1].components[0].emoji.name = '\u2B05', delete componentsArray[1].components[0].emoji.id;
			componentsArray[1].components[1].emoji.name = '\u2B07', delete componentsArray[1].components[1].emoji.id;
			componentsArray[1].components[2].emoji.name = '\u27A1', delete componentsArray[1].components[2].emoji.id;
		}

		function lockButtons(boolean = true) {
			componentsArray[1].components[1].disabled = boolean;
			componentsArray[0].components[1].disabled = boolean;
			componentsArray[1].components[2].disabled = boolean;
			componentsArray[1].components[0].disabled = boolean;
		}
		function insertIdsInComponents() {
			componentsArray[1].components[1].custom_id = componentsArray[1].components[1].custom_id.split('|')[0] + '|' + componentsArray[1].components[1].emoji.id;
			componentsArray[0].components[1].custom_id = componentsArray[0].components[1].custom_id.split('|')[0] + '|' + componentsArray[0].components[1].emoji.id;
			componentsArray[1].components[2].custom_id = componentsArray[1].components[2].custom_id.split('|')[0] + '|' + componentsArray[1].components[2].emoji.id;
			componentsArray[1].components[0].custom_id = componentsArray[1].components[0].custom_id.split('|')[0] + '|' + componentsArray[1].components[0].emoji.id;
		}
		setButtons();

		// SETTING THE EMOJIS DEPENDING ON WHAT'S DOWN, LEFT, UP, RIGHT.
		function setEmojis() {
			left = data.Saves[0].Field[indexOfHero[0]][indexOfHero[1] - 1];
			right = data.Saves[0].Field[indexOfHero[0]][indexOfHero[1] + 1];
			down = data.Saves[0].Field[indexOfHero[0] + 1];
			up = data.Saves[0].Field[indexOfHero[0] - 1];

			// PRIORITY
			setEmojisUtils('campfire', indexOfHero, null, true);
			setEmojisUtils('water', indexOfHero, null, true);
			setEmojisUtils('tree', indexOfHero, 'axe');
			setEmojisUtils('rock1', indexOfHero, 'pickaxe');
			setEmojisUtils('rock2', indexOfHero, 'pickaxe');
			setEmojisUtils('mushroom1', indexOfHero, 'mushroom');
			setEmojisUtils('mushroom2', indexOfHero, 'mushroom');
			setEmojisUtils('chest', indexOfHero, 'opened_chest');
			// LOCKING BUTTONS IF THE USER IS FAR TO GET OFF THE GRID
			insertIdsInComponents();

			if(!down) componentsArray[1].components[1].disabled = true;
			if(!up) componentsArray[0].components[1].disabled = true;
			if(!right) componentsArray[1].components[2].disabled = true;
			if(!left) componentsArray[1].components[0].disabled = true;
		}

		function setEmojisUtilsEmojis(first, second, third, fourth, index, emoji, item) {
			if(first === true) { if(data.Saves[0].Field[index[0] - 1][index[1]].includes(emojis[item])) componentsArray[0].components[1].emoji = { id: emojis[emoji] }; }
			if(second === true) { if(data.Saves[0].Field[index[0] + 1][index[1]].includes(emojis[item])) componentsArray[1].components[1].emoji = { id: emojis[emoji] }; }
			if(third === true) { if(data.Saves[0].Field[index[0]][index[1] + 1].includes(emojis[item])) componentsArray[1].components[2].emoji = { id: emojis[emoji] };}
			if(fourth === true) { if(data.Saves[0].Field[index[0]][index[1] - 1].includes(emojis[item])) componentsArray[1].components[0].emoji = { id: emojis[emoji] }; }
		}
		function setEmojisUtilsLock(first, second, third, fourth, index, item) {
			if(item === 'tree') return;

			if(first === true) { if(data.Saves[0].Field[index[0] - 1][index[1]].includes(emojis[item])) componentsArray[0].components[1].disabled = true; }
			if(second === true) { if(data.Saves[0].Field[index[0] + 1][index[1]].includes(emojis[item])) componentsArray[1].components[1].disabled = true; }
			if(third === true) { if(data.Saves[0].Field[index[0]][index[1] + 1].includes(emojis[item])) componentsArray[1].components[2].disabled = true; }
			if(fourth === true) { if(data.Saves[0].Field[index[0]][index[1] - 1].includes(emojis[item])) componentsArray[1].components[0].disabled = true; }
		}

		function setEmojisUtils(item, index, emoji, lock = false) {
			if(up === undefined) {
				setEmojisUtilsLock(!!up, !!down, !!right, !!left, index, item);
				if(lock !== true) setEmojisUtilsEmojis(!!up, !!down, !!right, !!left, index, emoji, item);
				componentsArray[0].components[1].disabled = true;
			}
			else
			if(down === undefined) {
				setEmojisUtilsLock(!!up, !!down, !!right, !!left, index, item);
				if(lock !== true) setEmojisUtilsEmojis(!!up, !!down, !!right, !!left, index, emoji, item);
				componentsArray[1].components[1].disabled = true;
			}
			else
			if(right === undefined) {
				setEmojisUtilsLock(!!up, !!down, !!right, !!left, index, item);
				if(lock !== true) setEmojisUtilsEmojis(!!up, !!down, !!right, !!left, index, emoji, item);
				componentsArray[1].components[2].disabled = true;
			}
			else
			if(left === undefined) {
				setEmojisUtilsLock(!!up, !!down, !!right, !!left, index, item);
				if(lock !== true) setEmojisUtilsEmojis(!!up, !!down, !!right, !!left, index, emoji, item);
				return componentsArray[1].components[0].disabled = true;
			}
			else {
				if(lock === true && up[index[1]].includes(emojis[item])) componentsArray[0].components[1].disabled = true;
				if(lock === true && left.includes(emojis[item])) componentsArray[1].components[0].disabled = true;
				if(lock === true && down[index[1]].includes(emojis[item])) componentsArray[1].components[1].disabled = true;
				if(lock === true && right.includes(emojis[item])) componentsArray[1].components[2].disabled = true;

				// if(left && lock === false) { if(left.includes(emojis.grass)) componentsArray[1].components[0].disabled = false; }
				// if(right && lock === false) { if(right.includes(emojis.grass)) componentsArray[1].components[2].disabled = false; }
				// if(up && lock === false) { if(up.includes(emojis.grass)) componentsArray[0].components[1].disabled = false; }
				// if(down && lock === false) { if(down.includes(emojis.grass)) componentsArray[1].components[1].disabled = false; }

				setEmojisUtilsEmojis(true, false, false, false, index, emoji, item);
				setEmojisUtilsEmojis(false, true, false, false, index, emoji, item);
				setEmojisUtilsEmojis(false, false, true, false, index, emoji, item);
				setEmojisUtilsEmojis(false, false, false, true, index, emoji, item);
			}

		}
		function editMessage(content = data.Saves[0].Field.join('\n').replace(/,/gi, '')) {
			interaction.editOriginalMessage({ content: content, components: componentsArray });
		}

		async function saveData() {
			await client.db.forceUpdate({ UserId: interaction.member.id }, data, require('../../Schemas/Users'));
		}
		function findDirection(v1, v2) {
			return v1 === -1 && v2 === 0 ? 'up' :
				v1 === 1 && v2 === 0 ? 'down' :
					v1 === 0 && v2 === -1 ? 'left' :
						v1 === 0 && v2 === 1 ? 'right' : null;
		}

		async function move(v1, v2) {
			const direction = findDirection(v1, v2);
			const savedField = data.Saves[0].Field[indexOfHero[0] + (v1)][indexOfHero[1] + (v2)];
			data.Saves[0].Field[indexOfHero[0] + (v1)][indexOfHero[1] + (v2)] = emojis[`idle_${direction}`];
			data.Saves[0].Field[indexOfHero[0]][indexOfHero[1]] = savedField;

			indexOfHero = client.utils.indexOfEnchanted(data.Saves[0].Field, emojis[`idle_${direction}`]);
			await saveData();
			setEmojis();
			editMessage();
		}

		async function interact(value, direction, coordinates) {
			const animation = value === 'Wood' ? 'chop' : 'mining';
			if(value === 'Mushroom') {
				const savedValue2 = data.Saves[0].Field[0][7];
				data.Saves[0].Field[0][7] += `        +${emojis[value]}${client.utils.smallNumbers(1)}`;

				lockButtons();
				editMessage();
				setTimeout(async () => {
					data.Saves[0].Field[indexOfHero[0] + coordinates[0]][indexOfHero[1] + coordinates[1]] = emojis.grass;
					data.Saves[0].Backpack.Mushroom += 1;
					data.Saves[0].Field[0][7] = savedValue2;

					await saveData();
					lockButtons(false);
					setEmojis();
					editMessage();
				}, 2000);

			}
			else
			if(value === 'Chest') {
				const savedValue = data.Saves[0].Field[0][7];

				data.Saves[0].Field[0][7] += `        +${emojis.Mushroom}${client.utils.smallNumbers(10)}${emojis.Wood}${client.utils.smallNumbers(30)}${emojis.Stone}${client.utils.smallNumbers(10)}`;
				lockButtons();
				editMessage();
				setTimeout(async () => {
					data.Saves[0].Field[indexOfHero[0] + coordinates[0]][indexOfHero[1] + coordinates[1]] = emojis.grass;
					data.Saves[0].Field[0][7] = savedValue;
					data.Saves[0].Backpack.Mushroom += 10;
					data.Saves[0].Backpack.Stone += 10;
					data.Saves[0].Backpack.Wood += 30;

					await saveData();
					lockButtons(false);
					setEmojis();
					editMessage();
				}, 2000);

			}
			else {
				const savedValue = data.Saves[0].Field[indexOfHero[0]][indexOfHero[1]];
				const savedValue2 = data.Saves[0].Field[0][7];
				data.Saves[0].Field[indexOfHero[0]][indexOfHero[1]] = emojis[`${animation}_${direction}`];
				data.Saves[0].Field[0][7] += `        +${emojis[value]}${client.utils.smallNumbers(3)}`;

				await saveData();
				lockButtons();
				editMessage();
				setTimeout(async () => {
					data.Saves[0].Field[indexOfHero[0]][indexOfHero[1]] = savedValue;
					data.Saves[0].Field[indexOfHero[0] + coordinates[0]][indexOfHero[1] + coordinates[1]] = emojis.grass;
					data.Saves[0].Backpack[value] += 3;
					data.Saves[0].Field[0][7] = savedValue2;
					await saveData();
					lockButtons(false);
					setEmojis();
					editMessage();
				}, 2000);
			}
		}
		async function interactMain(custom_id, coordinates) {
			if(custom_id[1] === emojis.pickaxe) { interact('Stone', findDirection(coordinates[0], coordinates[1]), [coordinates[0], coordinates[1]]); }
			else if(custom_id[1] === emojis.axe) { interact('Wood', findDirection(coordinates[0], coordinates[1]), [coordinates[0], coordinates[1]]); }
			else if(custom_id[1] === emojis.mushroom) { interact('Mushroom', findDirection(coordinates[0], coordinates[1]), [coordinates[0], coordinates[1]]); }
			else if(custom_id[1] === emojis.opened_chest) { interact('Chest', findDirection(coordinates[0], coordinates[1]), [coordinates[0], coordinates[1]]); }
			else {await move(coordinates[0], coordinates[1]);}
		}

		async function spawnItem() {
			const randomIndex1 = Math.floor(Math.random() * 7);
			const randomIndex2 = Math.floor(Math.random() * 7);
			const randItem = client.utils.chooseRandomItem();

			if(data.Saves[0].Field[randomIndex1][randomIndex2] !== emojis.grass) return spawnItem();

			data.Saves[0].Field[0][7] += `        A wild ${emojis[randItem]} appeared!`;


			data.Saves[0].Field[randomIndex1][randomIndex2] = emojis[randItem];

			setTimeout(async () => {
				data.Saves[0].Field[0][7] = emojis.grass;
				await saveData();
				editMessage();
			}, 3000);
			await saveData();
			lockButtons(false);
			setEmojis();
			editMessage();
		}
		setEmojis();

		interaction.createFollowup({ content: data.Saves[0].Field.join('\n').replace(/,/gi, ''), components: componentsArray, flags: 64 });

		const collector = await this.client.utils.createInteractionCollector({
			client: this.client,
			interaction: interaction,
			componentType: 2,
			filter: (user) => user.member.user.id === interaction.member.user.id,
		});

		collector.on('collect', async button => {
			const custom_id = button.data.custom_id.split('|');
			if(!Object.values(customIds).includes(custom_id[0])) return;
			if(button.acknowledged === false) await button.acknowledge();

			setButtons();
			lockButtons(false);

			if(custom_id[0] === customIds.up) interactMain(custom_id, [-1, 0]);
			if(custom_id[0] === customIds.down) interactMain(custom_id, [1, 0]);
			if(custom_id[0] === customIds.left) interactMain(custom_id, [0, -1]);
			if(custom_id[0] === customIds.right) interactMain(custom_id, [0, 1]);
			//
			if(custom_id[0] === customIds.backpack) {
				let msg = '';
				let i = 0;
				Object.keys(data.Saves[0].Backpack).forEach((key) => {
					i++;
					msg += `${emojis[key]}${this.client.utils.smallNumbers(data.Saves[0].Backpack[key])}${i === 5 || i === 10 || i === 15 ? '\n' : ''}`;
				});
				componentsArray[0].components[3].label = 'Playground';
				componentsArray[0].components[3].custom_id = customIds.playground;
				lockButtons();
				editMessage(msg);
			}
			if(custom_id[0] === customIds.playground) {
				componentsArray[0].components[3].label = 'Backpack';
				componentsArray[0].components[3].custom_id = customIds.backpack;
				lockButtons(false);
				setEmojis();
				editMessage();
			}
		});
		this.client.on('command', (interactio) => {if(interactio.member.user.id === interaction.member.user.id) return collector.stopListening('end');});

		setInterval(async () => {
			await spawnItem();
		}, 15000);
	}
};