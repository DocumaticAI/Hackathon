const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const db = require('quick.db')
require("dotenv").config();

const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAIKEY);

const PasteClient = require("pastebin-api").default;
const paste = new PasteClient("DEV_API_KEY");

const token = process.env.BOT_TOKEN;

let client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.pastebin = paste;
client.db = db;
client.deepai = deepai;

/** Registering/Replying to Slash Commands -- Start */
client.slash_commands = new Collection();

const slashcommandFiles = fs
  .readdirSync("./commands/slash/")
  .filter((file) => file.endsWith(".js"));

for (const file of slashcommandFiles) {
  const command = require(`./commands/slash/${file}`);
  client.slash_commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.slash_commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
/** Registering/Replying to Slash Commands -- End */

/** Registering Events -- Start */
const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}
/** Registering Events -- End */

/** Registering Message Commands -- Start */
client.message_commands = new Collection();
const msg_commandFiles = fs
  .readdirSync("./commands/message")
  .filter((file) => file.endsWith(".js"));

for (const file of msg_commandFiles) {
  const command = require(`./commands/message/${file}`);
  client.message_commands.set(command.name, command);
}
/** Registering Message Commands -- End */

client.login(token);
