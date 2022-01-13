// Deplying commands

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs'
const BOT_ID = process.env.BOT_ID! as string;
const BOT_TOKEN = process.env.BOT_TOKEN! as string;

const slashcommands: [] = [];
const slashcommandFiles = fs.readdirSync('./src/slash').filter(file => file.endsWith('.js'));

const rest = new REST({ version: '9' }).setToken(BOT_TOKEN);

rest.put(Routes.applicationCommands(BOT_ID), { body: slashcommands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);