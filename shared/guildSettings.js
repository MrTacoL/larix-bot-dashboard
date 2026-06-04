import mongoose from 'mongoose';

const basicModule = {
  enabled: { type: Boolean, default: false },
  channelId: { type: String, default: '' },
  roleId: { type: String, default: '' },
  message: { type: String, default: '' }
};

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
    goodbyeChannelId: { type: String, default: '' },
    message: { type: String, default: 'Welcome {user} to {server}!' },
    goodbyeMessage: { type: String, default: 'Goodbye {user}.' },
    imageUrl: { type: String, default: '' },
    autoRoleId: { type: String, default: '' }
  },
  automod: {
    antiLinks: { type: Boolean, default: false },
    antiInvites: { type: Boolean, default: true },
    blockedWords: { type: [String], default: [] },
    logChannelId: { type: String, default: '' },
    muteRoleId: { type: String, default: '' }
  },
  tickets: {
    enabled: { type: Boolean, default: false },
    categoryId: { type: String, default: '' },
    staffRoleId: { type: String, default: '' },
    transcriptChannelId: { type: String, default: '' },
    panelChannelId: { type: String, default: '' },
    panelMessage: { type: String, default: 'Open a support ticket.' }
  },
  reactionRoles: basicModule,
  levels: {
    enabled: { type: Boolean, default: false },
    levelUpChannelId: { type: String, default: '' },
    xpPerMessage: { type: String, default: '15' },
    cooldownSeconds: { type: String, default: '60' },
    rewardRoleId: { type: String, default: '' }
  },
  achievements: basicModule,
  starboards: {
    enabled: { type: Boolean, default: false },
    channelId: { type: String, default: '' },
    emoji: { type: String, default: '⭐' },
    requiredStars: { type: String, default: '3' }
  },
  automations: basicModule,
  customCommands: {
    enabled: { type: Boolean, default: false },
    prefix: { type: String, default: '!' },
    logChannelId: { type: String, default: '' },
    managerRoleId: { type: String, default: '' }
  },
  inviteTracker: {
    enabled: { type: Boolean, default: false },
    channelId: { type: String, default: '' },
    rewardRoleId: { type: String, default: '' },
    requiredInvites: { type: String, default: '5' }
  },
  polls: basicModule,
  searchAnything: basicModule,
  help: {
    enabled: { type: Boolean, default: true },
    channelId: { type: String, default: '' },
    supportRoleId: { type: String, default: '' },
    message: { type: String, default: 'Use the Larix dashboard or slash commands for help.' }
  },
  reminders: basicModule,
  statisticsChannels: {
    enabled: { type: Boolean, default: false },
    categoryId: { type: String, default: '' },
    memberCountChannelId: { type: String, default: '' },
    botCountChannelId: { type: String, default: '' }
  },
  temporaryChannels: {
    enabled: { type: Boolean, default: false },
    lobbyChannelId: { type: String, default: '' },
    categoryId: { type: String, default: '' },
    defaultName: { type: String, default: '{user} voice' },
    userLimit: { type: String, default: '5' }
  }
}, { timestamps: true });

export const GuildSettings = mongoose.models.GuildSettings || mongoose.model('GuildSettings', guildSettingsSchema);

export async function getGuildSettings(guildId, defaults = {}) {
  let settings = await GuildSettings.findOne({ guildId });
  if (!settings) settings = await GuildSettings.create({ guildId, ...defaults });
  return settings;
}
