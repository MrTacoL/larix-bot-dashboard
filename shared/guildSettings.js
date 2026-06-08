import mongoose from 'mongoose';

const mixed = { type: mongoose.Schema.Types.Mixed, default: {} };

const guildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  guildName: { type: String, default: '' },
  embedColor: { type: String, default: '#ff3131' },
  logChannelId: { type: String, default: '' },

  suggestions: mixed,
  welcome: mixed,
  automod: mixed,
  logging: mixed,
  tickets: mixed,
  reactionRoles: mixed,
  levels: mixed,
  achievements: mixed,
  starboards: mixed,
  automations: mixed,
  customCommands: mixed,
  inviteTracker: mixed,
  polls: mixed,
  searchAnything: mixed,
  search: mixed,
  help: mixed,
  reminders: mixed,
  statisticsChannels: mixed,
  temporaryChannels: mixed,
  moderation: mixed
}, { timestamps: true, strict: false });

export const GuildSettings = mongoose.models.GuildSettings || mongoose.model('GuildSettings', guildSettingsSchema);

export async function getGuildSettings(guildId, defaults = {}) {
  let settings = await GuildSettings.findOne({ guildId });
  if (!settings) settings = await GuildSettings.create({ guildId, ...defaults });
  return settings;
}
