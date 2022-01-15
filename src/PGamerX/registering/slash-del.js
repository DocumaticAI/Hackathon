const { readdirSync } = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
require('dotenv').config()

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.BOT_CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const commands = [];

const rest = new REST({ version: "9" }).setToken(BOT_TOKEN);

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
  .then(() => console.log(`Successfully deleted application commands. ${commands.length} commands deleted.`))
  .catch(console.error);
