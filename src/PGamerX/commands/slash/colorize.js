const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("colorize")
    .setDescription("Turn any black & white image into a colored one!"),
  async execute(interaction) {
    const filter = (m) => m.attachments.size > 0;
    await interaction.editReply({
      content:
        "Kindly send a black and white image in this channel within 15 seconds.",
    });
    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (m) => {
      

     const attachment_url = [...m.attachments.values()][0].url;
      if (!attachment_url) {
        return m.channel.send(`Please send a valid black and white image`)
      }
      const sent = await m.channel.send(`Image Recieved, Processing :gear:`)
      const resp = await interaction.client.deepai.callStandardApi(
        "colorizer",
        {
          image: attachment_url,
        }
      );
      const embed = new MessageEmbed()
        .setTitle("Colored Image")
        .setImage(resp["output_url"])
        .setColor("GREEN")
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .setFooter({ text: `Generated by ${interaction.user.username}` });
      await sent.edit({ content: "Processing Completed, here is the result",embeds: [embed] });
    });
    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};