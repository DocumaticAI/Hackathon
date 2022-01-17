const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a member.',
  category: 'Moderation',
  options: [
    {
      name: 'user',
      description: 'Mention a user',
      required: true,
      type: 'USER'
    },
    {
      name: 'reason',
      description: 'Specify reason for ban',
      required: true,
      type: 'STRING'
    }
  ],
  async run({ interaction, bot, guild }) {
    const user = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');
    if (!interaction.member.permissions.has('BAN_MEMBERS'))
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`You don't have permissions to ban members.`)]
      });
    if (interaction.guild.me.roles.highest.comparePositionTo(user.roles.highest) < 0)
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`I cannot ban ${user} because of role hierarchy.`)]
      });
    if (!user.bannable)
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`I cannot ban ${user}.`)]
      });
    if (user.id == interaction.user.id)
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`You cannot ban yourself.`)]
      });
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('ban-proceed').setStyle('SUCCESS').setLabel('Proceed'),
      new MessageButton().setCustomId('ban-cancel').setStyle('DANGER').setLabel('Cancel')
    );
    const msg = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('Pending Conformation')
          .setColor('BLURPLE')
          .setDescription(`Are you sure you want to ban ${user} for reason: \`${reason}\`?`)
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
      if (i.customId == 'ban-proceed') {
        const ban_success = new MessageEmbed()
          .setTitle('Banned')
          .setColor('BLURPLE')
          .addField('Offender', `${user}`, false)
          .addField('Reason', `${reason}`, false)
          .addField('Moderator', `${interaction.user}`, false);
        const inform_embed = new MessageEmbed()
          .setTitle('You were banned')
          .setColor('BLURPLE')
          .addField('Offender', `${user}`, false)
          .addField('Reason', `${reason}`, false)
          .addField('Moderator', `${interaction.user}`, false)
          .addField('Guild', `${interaction.guild.name}`, false);
        try {
          user.send({
            embeds: [inform_embed]
          });
        } catch (err) {
          ban_success.setFooter({ text: `I was not able to DM inform ${user.tag}` });
        }
        msg.edit({
          embeds: [ban_success],
          components: []
        });
        user.ban({ reason: reason });
      } else if (i.customId == 'ban-cancel') {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setTitle('Process Cancelled')
              .setColor('BLURPLE')
              .setDescription(`${user} was not banned.`)
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
              .setDescription(`${user} was not banned.`)
              .setFooter({ text: 'Reason: Inactivity Timeout' })
          ],
          components: []
        });
    });
  }
};
