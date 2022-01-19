const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const db = require('quick.db')
require("dotenv").config();

const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAIKEY);


const token = process.env.BOT_TOKEN;
let client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

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

client.login(token);
