// Import Modules
import {
  Client,
  Intents,
  Message,
  MessageEmbed,
  MessageReaction,
  User,
} from "discord.js";
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Create Client
const client: Client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
});
