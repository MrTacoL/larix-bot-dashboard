import 'dotenv/config';
import {
  AuditLogEvent,
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  PermissionsBitField
} from 'discord.js';
import { connectDatabase } from '../../shared/database.js';
import { getGuildSettings } from '../../shared/guildSettings.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.User]
});

const buckets = new Map();
const warnings = new Map();

const defaultDomains = ['youtube.com', 'youtu.be', 'google.com', 'discord.com', 'discordapp.com', 'reddit.com', 'tenor.com', 'twitter.com', 'facebook.com'];
const riskyFileTypes = ['.exe', '.bat', '.cmd', '.scr', '.ps1', '.vbs', '.js', '.jar', '.msi', '.com'];

function bool(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() === 'true';
  return fallback;
}

function arr(value) {
  if (Array.isArray(value)) return value.map(String).map(item => item.trim()).filter(Boolean);
  if (typeof value === 'string') return value.split(/\n|,/).map(item => item.trim()).filter(Boolean);
  return [];
}

function numberValue(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalize(text = '') {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, '');
}

function hasManagerPerms(member) {
  return member?.permissions?.has(PermissionsBitField.Flags.Administrator) || member?.permissions?.has(PermissionsBitField.Flags.ManageGuild);
}

async function settingsFor(guild) {
  await connectDatabase();
  return getGuildSettings(guild.id, { guildName: guild.name });
}

async function sendEmbed(channelId, guild, title, description, color = 0x3aa0ff) {
  if (!channelId) return;
  const channel = await guild.channels.fetch(channelId).catch(() => null);
  if (!channel?.isTextBased()) return;
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description?.slice(0, 3900) || 'No details.')
    .setColor(color)
    .setTimestamp();
  await channel.send({ embeds: [embed] }).catch(() => null);
}

function logChannel(settings, type) {
  const logging = settings.logging || {};
  if (type === 'member') return logging.memberLogChannelId || logging.defaultLogChannelId || settings.logChannelId;
  if (type === 'server') return logging.serverLogChannelId || logging.defaultLogChannelId || settings.logChannelId;
  if (type === 'voice') return logging.voiceLogChannelId || logging.defaultLogChannelId || settings.logChannelId;
  if (type === 'message') return logging.messageLogChannelId || logging.defaultLogChannelId || settings.logChannelId;
  if (type === 'joinLeave') return logging.joinLeaveLogChannelId || logging.memberLogChannelId || logging.defaultLogChannelId || settings.logChannelId;
  return logging.defaultLogChannelId || settings.logChannelId;
}

async function logEvent(guild, type, title, description, color) {
  const settings = await settingsFor(guild).catch(() => null);
  if (!settings || !bool(settings.logging?.enabled, true)) return;
  await sendEmbed(logChannel(settings, type), guild, title, description, color);
}

function addToBucket(key, windowMs) {
  const now = Date.now();
  const old = buckets.get(key) || [];
  const fresh = old.filter(time => now - time <= windowMs);
  fresh.push(now);
  buckets.set(key, fresh);
  return fresh.length;
}

async function punish(message, settings, reason, options = {}) {
  const automod = settings.automod || {};
  const member = message.member;
  const punishment = options.punishment || 'Warn';
  const muteMinutes = numberValue(options.muteMinutes, 10);

  if (options.deleteMessage !== false && message.deletable) {
    await message.delete().catch(() => null);
  }

  if (punishment === 'Warn' || options.warn) {
    const key = `${message.guild.id}:${message.author.id}`;
    warnings.set(key, (warnings.get(key) || 0) + 1);
    await message.channel.send({ content: `${message.author}, warning: ${reason}` }).catch(() => null);
  }

  if ((punishment === 'Tempmute' || punishment === 'Mute') && member) {
    const muteRoleId = automod.muteRoleId;
    if (muteRoleId) await member.roles.add(muteRoleId, reason).catch(() => null);
    await member.timeout(muteMinutes * 60 * 1000, reason).catch(() => null);
  }

  if (punishment === 'Kick' && member?.kickable) {
    await member.kick(reason).catch(() => null);
  }

  await sendEmbed(
    automod.defaultLogChannelId || settings.logging?.defaultLogChannelId || settings.logChannelId,
    message.guild,
    'Automod Action',
    `User: ${message.author.tag}\nChannel: ${message.channel}\nReason: ${reason}\nPunishment: ${punishment}`,
    0xff3131
  );
}

function channelAllowed(message, automod) {
  const allowedChannels = arr(automod.allowedChannels);
  const allowedRoles = arr(automod.allowedRoles);
  if (allowedChannels.includes(message.channel.id) || allowedChannels.includes(message.channel.parentId)) return true;
  if (message.member?.roles?.cache?.some(role => allowedRoles.includes(role.id))) return true;
  return false;
}

function extractDomains(text) {
  const matches = text.match(/https?:\/\/[^\s]+|(?:[a-z0-9-]+\.)+[a-z]{2,}/gi) || [];
  return matches.map(raw => {
    try {
      const withProtocol = raw.startsWith('http') ? raw : `https://${raw}`;
      return new URL(withProtocol).hostname.replace(/^www\./, '').toLowerCase();
    } catch {
      return raw.toLowerCase().replace(/^www\./, '');
    }
  });
}

client.once('ready', async () => {
  await connectDatabase().catch(error => console.error('Database connection failed:', error.message));
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  await interaction.reply({ content: 'Larix bot is running.', ephemeral: true });
});

client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot) return;
  const settings = await settingsFor(message.guild).catch(() => null);
  if (!settings) return;
  const automod = settings.automod || {};
  if (!bool(automod.enabled, true)) return;
  if (hasManagerPerms(message.member)) return;
  if (channelAllowed(message, automod)) return;

  const content = message.content || '';
  const clean = normalize(content);

  const mediaOnly = arr(automod.mediaOnlyChannels);
  if (mediaOnly.includes(message.channel.id) && message.attachments.size === 0) {
    return punish(message, settings, 'Media-only channel requires an attachment.', { punishment: 'Delete message' });
  }

  if (bool(automod.deleteScaryFiles, true)) {
    const risky = message.attachments.some(file => riskyFileTypes.some(type => file.name?.toLowerCase().endsWith(type)));
    if (risky) return punish(message, settings, 'Blocked risky file attachment.', { punishment: 'Delete message' });
  }

  const honeypotChannels = arr(automod.honeypotChannels || automod.honeypot?.channels);
  if (bool(automod.honeypotEnabled, false) && honeypotChannels.includes(message.channel.id)) {
    return punish(message, settings, 'Honeypot channel triggered.', { punishment: automod.honeypotPunishment || 'Mute' });
  }

  const inviteRegex = /(discord\.gg|discord\.com\/invite|discordapp\.com\/invite)\//i;
  if (bool(automod.inviteSpamEnabled, automod.antiInvites ?? true) && inviteRegex.test(content)) {
    const count = addToBucket(`invite:${message.guild.id}:${message.author.id}`, 10000);
    if (count >= 1) return punish(message, settings, 'Discord invite detected.', { punishment: automod.inviteSpamPunishment || 'Tempmute', muteMinutes: automod.inviteSpamMuteMinutes });
  }

  if (bool(automod.linkSpamEnabled, automod.antiLinks ?? true)) {
    const domains = extractDomains(content);
    const whitelist = arr(automod.whitelistedDomains).length ? arr(automod.whitelistedDomains) : defaultDomains;
    const badLink = domains.some(domain => !whitelist.some(allowed => domain === allowed || domain.endsWith(`.${allowed}`)));
    if (badLink) {
      const count = addToBucket(`link:${message.guild.id}:${message.author.id}`, numberValue(automod.linkSpamWindowSeconds, 1) * 1000);
      if (count >= numberValue(automod.linkSpamThreshold, 1)) return punish(message, settings, 'Blocked link detected.', { punishment: automod.linkSpamPunishment || 'Tempmute', muteMinutes: automod.linkSpamMuteMinutes });
    }
  }

  const blocked = arr(automod.blockedWords);
  if (bool(automod.badWordsEnabled, true) && blocked.some(word => clean.includes(normalize(word)))) {
    return punish(message, settings, 'Blocked word detected.', { punishment: automod.badWordsPunishment || 'Tempmute', muteMinutes: automod.badWordsMuteMinutes });
  }

  if (bool(automod.mentionSpamEnabled, true)) {
    const mentions = message.mentions.users.size + message.mentions.roles.size;
    if (mentions >= numberValue(automod.mentionSpamThreshold, 4)) {
      return punish(message, settings, 'Mention spam detected.', { punishment: automod.mentionSpamPunishment || 'Tempmute', muteMinutes: automod.mentionSpamMuteMinutes });
    }
  }

  if (bool(automod.attachmentSpamEnabled, true) && message.attachments.size > 0) {
    const count = addToBucket(`files:${message.guild.id}:${message.author.id}`, numberValue(automod.attachmentSpamWindowSeconds, 15) * 1000);
    if (count >= numberValue(automod.attachmentSpamThreshold, 4)) return punish(message, settings, 'Attachment spam detected.', { punishment: automod.attachmentSpamPunishment || 'Tempmute', muteMinutes: automod.attachmentSpamMuteMinutes });
  }

  if (bool(automod.capsEnabled, false) && content.length >= 8) {
    const letters = content.replace(/[^a-z]/gi, '');
    const caps = content.replace(/[^A-Z]/g, '');
    const percent = letters.length ? (caps.length / letters.length) * 100 : 0;
    if (percent >= numberValue(automod.capsLimit, 70)) return punish(message, settings, 'Caps filter triggered.', { punishment: automod.capsPunishment || 'Delete message' });
  }

  if (bool(automod.spamEnabled, true)) {
    const count = addToBucket(`msg:${message.guild.id}:${message.author.id}`, numberValue(automod.spamWindowSeconds, 4) * 1000);
    if (count >= numberValue(automod.spamThreshold, 6)) return punish(message, settings, 'Message spam detected.', { punishment: automod.spamPunishment || 'Tempmute', muteMinutes: automod.spamMuteMinutes });
  }
});

client.on('messageDelete', async message => {
  if (!message.guild || message.author?.bot) return;
  const settings = await settingsFor(message.guild).catch(() => null);
  if (!settings?.logging?.deletedMessages) return;
  await sendEmbed(logChannel(settings, 'message'), message.guild, 'Message Deleted', `Channel: ${message.channel}\nAuthor: ${message.author?.tag || 'Unknown'}\nContent: ${message.content || 'Unavailable'}`, 0xff5757);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (!newMessage.guild || newMessage.author?.bot) return;
  const settings = await settingsFor(newMessage.guild).catch(() => null);
  if (!settings?.logging?.editedMessages) return;
  await sendEmbed(logChannel(settings, 'message'), newMessage.guild, 'Message Edited', `Channel: ${newMessage.channel}\nAuthor: ${newMessage.author?.tag || 'Unknown'}\nBefore: ${oldMessage.content || 'Unavailable'}\nAfter: ${newMessage.content || 'Unavailable'}`, 0xffcc00);
});

client.on('guildMemberAdd', member => logEvent(member.guild, 'joinLeave', 'Member Joined', `${member.user.tag} joined the server.`, 0x2ecc71));
client.on('guildMemberRemove', member => logEvent(member.guild, 'joinLeave', 'Member Left', `${member.user.tag} left the server.`, 0xe67e22));
client.on('guildBanAdd', ban => logEvent(ban.guild, 'member', 'Member Banned', `${ban.user.tag} was banned.`, 0xff3131));
client.on('guildBanRemove', ban => logEvent(ban.guild, 'member', 'Member Unbanned', `${ban.user.tag} was unbanned.`, 0x2ecc71));

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const settings = await settingsFor(newMember.guild).catch(() => null);
  if (!settings?.logging?.enabled) return;
  if (settings.logging.memberRoleUpdates && oldMember.roles.cache.size !== newMember.roles.cache.size) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Member Roles Updated', `${newMember.user.tag} roles changed.`, 0x3aa0ff);
  if (settings.logging.nameChanges && oldMember.displayName !== newMember.displayName) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Name Changed', `${oldMember.displayName} → ${newMember.displayName}`, 0x3aa0ff);
  if (settings.logging.memberTimeout && !oldMember.communicationDisabledUntil && newMember.communicationDisabledUntil) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Member Timed Out', `${newMember.user.tag} was timed out.`, 0xffcc00);
  if (settings.logging.memberRemoveTimeout && oldMember.communicationDisabledUntil && !newMember.communicationDisabledUntil) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Timeout Removed', `${newMember.user.tag} timeout removed.`, 0x2ecc71);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  const guild = newState.guild || oldState.guild;
  const settings = await settingsFor(guild).catch(() => null);
  if (!settings?.logging?.enabled) return;
  const member = newState.member || oldState.member;
  if (!oldState.channelId && newState.channelId && settings.logging.voiceJoin) await sendEmbed(logChannel(settings, 'voice'), guild, 'Voice Joined', `${member.user.tag} joined <#${newState.channelId}>.`, 0x2ecc71);
  if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId && settings.logging.voiceMove) await sendEmbed(logChannel(settings, 'voice'), guild, 'Voice Moved', `${member.user.tag} moved from <#${oldState.channelId}> to <#${newState.channelId}>.`, 0x3aa0ff);
  if (oldState.channelId && !newState.channelId && settings.logging.voiceLeave) await sendEmbed(logChannel(settings, 'voice'), guild, 'Voice Left', `${member.user.tag} left <#${oldState.channelId}>.`, 0xe67e22);
});

client.on('channelCreate', channel => channel.guild && logEvent(channel.guild, 'server', 'Channel Created', `${channel.name} was created.`, 0x2ecc71));
client.on('channelUpdate', (oldChannel, newChannel) => newChannel.guild && logEvent(newChannel.guild, 'server', 'Channel Updated', `${newChannel.name} was updated.`, 0x3aa0ff));
client.on('channelDelete', channel => channel.guild && logEvent(channel.guild, 'server', 'Channel Deleted', `${channel.name} was deleted.`, 0xff3131));
client.on('roleCreate', role => logEvent(role.guild, 'server', 'Role Created', `${role.name} was created.`, 0x2ecc71));
client.on('roleUpdate', (oldRole, newRole) => logEvent(newRole.guild, 'server', 'Role Updated', `${newRole.name} was updated.`, 0x3aa0ff));
client.on('roleDelete', role => logEvent(role.guild, 'server', 'Role Deleted', `${role.name} was deleted.`, 0xff3131));
client.on('guildUpdate', (oldGuild, newGuild) => logEvent(newGuild, 'server', 'Server Updated', `${newGuild.name} was updated.`, 0x3aa0ff));
client.on('emojiCreate', emoji => logEvent(emoji.guild, 'server', 'Emoji Created', `${emoji.name} was created.`, 0x2ecc71));
client.on('emojiUpdate', (oldEmoji, newEmoji) => logEvent(newEmoji.guild, 'server', 'Emoji Updated', `${newEmoji.name} was updated.`, 0x3aa0ff));
client.on('emojiDelete', emoji => logEvent(emoji.guild, 'server', 'Emoji Deleted', `${emoji.name} was deleted.`, 0xff3131));

client.login(process.env.BOT_TOKEN);
