const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("story")
    .setDescription("Generate/Share/View different AI-made stories.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription(
          "Do you want to Generate a story or view other stories?"
        )
        .setRequired(true)
        .addChoice("generate", "gen")
        .addChoice("view", "vi")
    )
    .addStringOption((option) =>
      option
        .setName("start")
        .setDescription(
          "Kindly enter a starting phrase for your story. (eg. I am a storyteller.)"
        )
    ),
  async execute(interaction) {
    const choice = interaction.options.getString("type");
    if (choice === "gen") {
      const start = interaction.options.getString("start");
      if (!start) {
        await interaction.editReply({
          content: "Please enter a starting phrase for your story.",
          ephemeral: true,
        });
        return;
      }

      // Check if number of words in the starting phrase is more than 20
      const words = start.split(" ");
      if (words.length > 20) {
        await interaction.editReply({
          content: "Please enter a starting phrase with less than 20 words.",
          ephemeral: true,
        });
        return;
      }

      const story = await interaction.client.deepai.callStandardApi(
        "text-generator",
        {
          text: start,
        }
      );

      await db.push("stories", [story.output]);
      await interaction.editReply({
        content: story.output,
        ephemeral: true,
      });
      return;
    } else if (choice === "vi") {
      const db = interaction.client.db;
      const stories = await db.get("stories");
      // Get a random story from the above array

      // Check if the story exists
      if (!stories[stories.length - 1]) {
        const story = stories[Math.floor(Math.random() * stories.length)];
        // Send the story to the user
        await interaction.editReply({
          content: story,
          ephemeral: true,
        });
        return;
      } else {
        await interaction.editReply({
          content: "There are no stories to view!",
          ephemeral: true,
        });
        return;
      }
    }
  },
};
