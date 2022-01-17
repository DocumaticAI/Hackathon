const config = require('./Structures/Config');
const Bot = require('./Structures/Bot');

const bot = new Bot(config);

bot.start();

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
