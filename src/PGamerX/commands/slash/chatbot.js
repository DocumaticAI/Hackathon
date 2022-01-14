const { SlashCommandBuilder } = require("@discordjs/builders");
const RsaKey = process.env.RSAKEY;
const RapidApiKey = process.env.RAPIDAPIKEY;
const axios = require("axios").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chatbot")
    .setDescription("Talk to an AI-powered chatbot")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What do you want to say?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString("message");
    var options = {
      method: "GET",
      url: "https://random-stuff-api.p.rapidapi.com/ai",
      params: {
        msg: message,
        id: interaction.user.id,
      },
      headers: {
        Authorization: RsaKey,
        "x-rapidapi-host": "random-stuff-api.p.rapidapi.com",
        "x-rapidapi-key": RapidApiKey,
      },
    };

    axios
      .request(options)
      .then(async function (response) {
        await interaction.editReply({
          content: response.data["AIResponse"]
        });
      })
      .catch(async function (error) {
          console.log(error)
        await interaction.editReply({
          content: `An Error occured: ${error}`,
        });
      });
  },
};
