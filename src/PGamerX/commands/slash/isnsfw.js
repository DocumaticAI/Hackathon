const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("isnsfw")
    .setDescription("Know if an image contains nudity or not."),
  async execute(interaction) {
    // Check if channel is NSFW
    if (!interaction.channel.nsfw) {
      return await interaction.editReply({
        content: "This command is only available in NSFW channels.",
        ephemeral: true,
      });
    }
    const filter = (m) => m.attachments.size > 0;
    await interaction.editReply({
      content: "Kindly send an image in this channel within 15 seconds.",
    });
    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (m) => {
      const attachment_url = [...m.attachments.values()][0].url;
      if (!attachment_url) {
        return m.channel.send(`Please send a valid image`);
      }
      const sent = await m.channel.send(`Image Recieved, Processing :gear:`);
      const resp = await interaction.client.deepai.callStandardApi(
        "nsfw-detector",
        {
          image: attachment_url,
        }
      );
      let color;
      if (resp["output"]["nsfw_score"] < 0.5) {
        color = "GREEN";
      } else if (resp["output"]["nsfw_score"] >= 0.5) {
        color = "RED";
      }
      const embed = new MessageEmbed()
        .setTitle("Nudity Detection")
        .setImage(attachment_url)
        .setColor(color)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL(),
        })
        .addField(
          "Probability of image being NSFW:",
          `${parseInt(parseFloat(resp["output"]["nsfw_score"]) * 100)}%`
        )
        .setFooter({ text: `Check ran by ${interaction.user.username}` });

      let i;
      for (i = 0; i < resp["output"]["detections"].length; i++) {
        embed.addField(
          `Detection ${i + 1}`,
          `${resp["output"]["detections"][i]["name"]}: ${
            parseFloat(resp["output"]["detections"][i]["confidence"]) * 100
          }%`
        );
      }
      await sent.edit({
        content: "Processing Completed, here is the result",
        embeds: [embed],
      });
    });
    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};
