const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const regex = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: 'unban',
  description: 'Unban a member.',
  category: 'Moderation',
  options: [
    {
      name: 'id',
      description: 'Provide user ID',
      required: true,
      type: 'STRING'
    }
  ],
  async run({ interaction, bot, guild }) {
    const id = interaction.options.getString('id');
    if (!interaction.member.permissions.has('BAN_MEMBERS'))
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`You don't have permissions to unban members.`)]
      });
    if (!regex.test(id))
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`Please provide a valid user ID.`)]
      });
    const banned_peeps = await interaction.guild.bans.fetch();
    let user;
    try {
      user = banned_peeps.get(id).user;
    } catch (err) {
      interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`Please provide a valid user ID.`)]
      });
    }
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('unban-proceed').setStyle('SUCCESS').setLabel('Proceed'),
      new MessageButton().setCustomId('unban-cancel').setStyle('DANGER').setLabel('Cancel')
    );
    const msg = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('Pending Conformation')
          .setColor('BLURPLE')
          .setDescription(`Are you sure you want to unban <@${id}>?`)
          .setFooter({ text: 'You have 60 seconds.' })
      ],
      components: [row],
      fetchReply: true
    });
    const collector = await msg.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 60000
    });
    collector.on('collect', async i => {
      if (i.user.id !== interaction.user.id)
        return await i.reply({
          content: `These components are not for you.`,
          ephemeral: true
        });
      if (i.customId == 'unban-proceed') {
        const ban_success = new MessageEmbed()
          .setTitle('Unbanned')
          .setColor('BLURPLE')
          .addField('Offender', `<@${id}>`, false)
          .addField('Moderator', `${interaction.user}`, false);
        msg.edit({
          embeds: [ban_success],
          components: []
        });
        await interaction.guild.members.unban({ user });
      } else if (i.customId == 'unban-cancel') {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setTitle('Process Cancelled')
              .setColor('BLURPLE')
              .setDescription(`<@${id}> was not unbanned.`)
          ],
          components: []
        });
      }
    });
    collector.on('end', async reason => {
      if (reason == 'time')
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setTitle('Process Cancelled')
              .setColor('BLURPLE')
              .setDescription(`<@${id}> was not unbanned.`)
              .setFooter({ text: 'Reason: Inactivity Timeout' })
          ],
          components: []
        });
    });
  }
};
