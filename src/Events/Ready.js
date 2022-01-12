module.exports = {
	event: 'ready',
	async run(bot) {
		bot.logger.success(`${bot.user.tag} is now logged in!`);
	},
};
