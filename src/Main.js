const config = require('./Structures/Config');
const Bot = require('./Structures/Bot');

const bot = new Bot(config);

bot.start();

process.on('uncaughtException', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
