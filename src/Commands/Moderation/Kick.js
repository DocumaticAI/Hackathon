const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a member.',
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
      description: 'Specify reason for kick',
      required: true,
      type: 'STRING'
    }
  ],
  async run({ interaction, bot, guild }) {
    const user = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');
    if (!interaction.member.permissions.has('KICK_MEMBERS'))
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`You don't have permissions to kick members.`)]
      });
    if (interaction.guild.me.roles.highest.comparePositionTo(user.roles.highest) < 0)
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`I cannot kick ${user} because of role hierarchy.`)]
      });
    if (!user.kickable)
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`I cannot kick ${user}.`)]
      });
    if (user.id == interaction.user.id)
      return interaction.reply({
        embeds: [new MessageEmbed().setColor('RED').setDescription(`You cannot kick yourself.`)]
      });
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('kick-proceed').setStyle('SUCCESS').setLabel('Proceed'),
      new MessageButton().setCustomId('kick-cancel').setStyle('DANGER').setLabel('Cancel')
    );
    const msg = await interaction.reply({
      embeds: [
        new MessageEmbed()
          .setTitle('Pending Conformation')
          .setColor('BLURPLE')
          .setDescription(`Are you sure you want to kick ${user} for reason: \`${reason}\`?`)
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
      if (i.customId == 'kick-proceed') {
        const kick_success = new MessageEmbed()
          .setTitle('Kicked')
          .setColor('BLURPLE')
          .addField('Offender', `${user}`, false)
          .addField('Reason', `${reason}`, false)
          .addField('Moderator', `${interaction.user}`, false);
        const inform_embed = new MessageEmbed()
          .setTitle('You were kicked')
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
          kick_success.setFooter({ text: `I was not able to DM inform ${user.tag}` });
        }
        msg.edit({
          embeds: [kick_success],
          components: []
        });
        user.kick({ reason: reason });
      } else if (i.customId == 'kick-cancel') {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setTitle('Process Cancelled')
              .setColor('BLURPLE')
              .setDescription(`${user} was not kicked.`)
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
              .setDescription(`${user} was not kicked.`)
              .setFooter({ text: 'Reason: Inactivity Timeout' })
          ],
          components: []
        });
    });
  }
};
