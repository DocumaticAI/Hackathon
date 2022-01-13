module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message) {
		message.channel.send('API Latency: ' + Math.round(client.ws.ping) + 'ms');
	},
};
