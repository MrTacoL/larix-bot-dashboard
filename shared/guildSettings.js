import mongoose from 'mongoose';

const guildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  guildName: { type: String, default: '' },
  embedColor: { type: String, default: '#ff3131' },
  logChannelId: { type: String, default: '' },
  suggestions: {
    enabled: { type: Boolean, default: true },
    channelId: { type: String, default: '' },
    staffRoleId: { type: String, default: '' },
    pendingColor: { type: String, default: '#ffcc00' },
    approvedColor: { type: String, default: '#2ecc71' },
    deniedColor: { type: String, default: '#e74c3c' }
  },
  welcome: {
    enabled: { type: Boolean, default: false },
    channelId: { type: String, default: '' },
    message: { type: String, default: 'Welcome {user} to {server}!' },
    imageUrl: { type: String, default: '' },
    autoRoleId: { type: String, default: '' }
  },
  automod: {
    antiLinks: { type: Boolean, default: false },
    antiInvites: { type: Boolean, default: true },
    blockedWords: { type: [String], default: [] }
  },
  tickets: {
    enabled: { type: Boolean, default: false },
    categoryId: { type: String, default: '' },
    staffRoleId: { type: String, default: '' },
    transcriptChannelId: { type: String, default: '' }
  }
}, { timestamps: true });

export const GuildSettings = mongoose.models.GuildSettings || mongoose.model('GuildSettings', guildSettingsSchema);

export async function getGuildSettings(guildId, defaults = {}) {
  let settings = await GuildSettings.findOne({ guildId });
  if (!settings) settings = await GuildSettings.create({ guildId, ...defaults });
  return settings;
}
