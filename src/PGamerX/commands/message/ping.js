exports.run = (client, message, args) => {
    message.channel.send(`Pong! API Latency is ${client.ws.ping} `).catch(console.error);
}