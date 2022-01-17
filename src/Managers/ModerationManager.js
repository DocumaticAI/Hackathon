const { Collection, MessageEmbed } = require('discord.js');
const ms = require('ms');
const { time } = require('@discordjs/builders');
module.exports = class ModerationManager {
  constructor(bot) {
    this.bot = bot;
    this.levels = new Collection();
  }

  determineLength(memberId) {
    if (!this.levels.has(memberId)) this.levels.set(memberId, 0);
    this.levels.set(memberId, this.levels.get(memberId) + 1);

    switch (this.levels.get(memberId)) {
      case 1:
        return 1000;
      case 2:
        return 1000 * 5;
      case 3:
        return 1000 * 12;
      case 4:
        return 1000 * 12;
    }
  }

  async mute(member, reason, channel) {
    const duration = this.determineLength(member.id);

    await member.timeout(duration, reason);
    await member.send({
      embeds: [
        new MessageEmbed()
          .setColor('RED')
          .setDescription(
            `${this.bot.config.emotes.warning} You were timedout until ${time(new Date(duration))} for ${reason}`
          )
      ]
    });

    await channel.send({
      embeds: [
        new MessageEmbed()
          .setColor('ORANGE')
          .setDescription(
            `${this.bot.config.emotes.warning} **${member.tag}** was timedout until ${time(
              new Date(duration)
            )} for ${reason}`
          )
      ]
    });
  }
};
