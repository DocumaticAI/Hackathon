const { Collection } = require('discord.js');

const mentions = new Collection();

module.exports = {
  event: 'messageCreate',
  async run(bot, message) {
    if (message.mentions.users.size > 8) return await bot.moderation.mute(message.member, 'Mass mentions');
  }
};
