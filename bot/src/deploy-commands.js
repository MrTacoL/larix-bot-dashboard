import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { commandJson } from './commands.js';

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

if (!token || !clientId || !guildId) {
  console.log('Skipping command deploy. Missing BOT_TOKEN, CLIENT_ID, or GUILD_ID.');
  process.exit(0);
}

const rest = new REST({ version: '10' }).setToken(token);
await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandJson });
console.log('Slash commands deployed.');
