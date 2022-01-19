const Event = require('../Structures/EventBase');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			once: true,
		});
	}
	async run() {
		this.client.utils.loadInteractions()
			.then(console.log(
				'---------------================================------------------\n' +
				'---------------       INTERACTIONS DONE        ------------------\n',
			))
			.catch(console.error);

	}
};