const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'lift-lockdown',
  description: 'Lift a server lockdown.',
  category: 'Moderation',
  async run({ interaction, bot, guild }) {
    await guild.roles.everyone.setPermissions(role.permissions.add('SEND_MESSAGES'));

    await interaction.reply({
      embeds: [new MessageEmbed().setColor('GREEN').setDescription(`${bot.config.emotes.success} Lockdown lifted.`)]
    });
  }
};
