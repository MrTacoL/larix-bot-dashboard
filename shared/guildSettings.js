import mongoose from 'mongoose';

const basicModule = {
  enabled: { type: Boolean, default: false },
  channelId: { type: String, default: '' },
  roleId: { type: String, default: '' },
  message: { type: String, default: '' }
};

const punishmentRule = {
  enabled: { type: Boolean, default: false },
  deleteMessage: { type: Boolean, default: true },
  warn: { type: Boolean, default: true },
  tempMute: { type: Boolean, default: false },
  muteMinutes: { type: String, default: '10' },
  threshold: { type: String, default: '1' },
  windowSeconds: { type: String, default: '1' }
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
    enabled: { type: Boolean, default: true },
    defaultLogChannelId: { type: String, default: '' },
    dramaChannelId: { type: String, default: '' },
    muteRoleId: { type: String, default: '' },
    allowedChannels: { type: [String], default: [] },
    allowedRoles: { type: [String], default: [] },
    mediaOnlyChannels: { type: [String], default: [] },
    deleteScaryFiles: { type: Boolean, default: true },
    antiLinks: { type: Boolean, default: true },
    antiInvites: { type: Boolean, default: true },
    blockedWords: { type: [String], default: [] },
    whitelistedDomains: { type: [String], default: ['youtube.com', 'youtu.be', 'google.com', 'discord.com', 'discordapp.com', 'reddit.com', 'tenor.com', 'twitter.com', 'facebook.com'] },
    inviteSpam: punishmentRule,
    mentionSpam: punishmentRule,
    attachmentSpam: punishmentRule,
    caps: { ...punishmentRule, capsLimit: { type: String, default: '70' } },
    honeypot: { ...punishmentRule, channels: { type: [String], default: [] } },
    linkSpam: punishmentRule,
    badWords: punishmentRule,
    spam: punishmentRule,
    warnThreshold: { enabled: { type: Boolean, default: false }, mute: { type: Boolean, default: true }, threshold: { type: String, default: '8' } }
  },
  logging: {
    enabled: { type: Boolean, default: true },
    defaultLogChannelId: { type: String, default: '' },
    memberLogChannelId: { type: String, default: '' },
    serverLogChannelId: { type: String, default: '' },
    voiceLogChannelId: { type: String, default: '' },
    messageLogChannelId: { type: String, default: '' },
    joinLeaveLogChannelId: { type: String, default: '' },
    ignoredChannels: { type: [String], default: [] },
    deletedMessages: { type: Boolean, default: true },
    editedMessages: { type: Boolean, default: true },
    purgedMessages: { type: Boolean, default: true },
    memberJoining: { type: Boolean, default: true },
    memberLeaving: { type: Boolean, default: true },
    channelCreation: { type: Boolean, default: true },
    channelUpdate: { type: Boolean, default: true },
    channelDeletion: { type: Boolean, default: true },
    roleCreation: { type: Boolean, default: true },
    roleUpdate: { type: Boolean, default: true },
    roleDeletion: { type: Boolean, default: true },
    serverUpdates: { type: Boolean, default: true },
    emojiChanges: { type: Boolean, default: true },
    memberRoleUpdates: { type: Boolean, default: true },
    nameChanges: { type: Boolean, default: true },
    avatarChanges: { type: Boolean, default: true },
    memberBans: { type: Boolean, default: true },
    memberUnbans: { type: Boolean, default: true },
    memberTimeout: { type: Boolean, default: true },
    memberRemoveTimeout: { type: Boolean, default: true },
    voiceJoin: { type: Boolean, default: true },
    voiceMove: { type: Boolean, default: true },
    voiceLeave: { type: Boolean, default: true }
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
