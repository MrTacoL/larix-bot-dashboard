import 'dotenv/config';
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  Partials,
  PermissionsBitField
} from 'discord.js';
import { connectDatabase } from '../../shared/database.js';
import { getGuildSettings } from '../../shared/guildSettings.js';
import { MemberStats, getMemberStats, xpForLevel } from '../../shared/memberStats.js';

const LARIX_BLUE = 0x3aa0ff;
const LARIX_RED = 0xff3131;
const LARIX_GREEN = 0x2ecc71;
const LARIX_YELLOW = 0xffcc00;

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

function larixEmbed(title, description, color = LARIX_BLUE) {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description?.slice(0, 3900) || 'No details.')
    .setColor(color)
    .setFooter({ text: 'Larix Bot' })
    .setTimestamp();
}

async function sendEmbed(channelId, guild, title, description, color = LARIX_BLUE) {
  if (!channelId) return;
  const channel = await guild.channels.fetch(channelId).catch(() => null);
  if (!channel?.isTextBased()) return;
  await channel.send({ embeds: [larixEmbed(title, description, color)] }).catch(() => null);
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

async function addXp(message, settings) {
  const levels = settings.levels || {};
  if (!bool(levels.enabled, false)) return;

  const stats = await getMemberStats(message.guild.id, message.author.id);
  const now = Date.now();
  const cooldown = numberValue(levels.cooldownSeconds, 60) * 1000;
  stats.messages += 1;

  if (now - stats.lastXpAt >= cooldown) {
    const gained = numberValue(levels.xpPerMessage, 15);
    stats.xp += gained;
    stats.lastXpAt = now;

    let leveled = false;
    while (stats.xp >= xpForLevel(stats.level + 1)) {
      stats.level += 1;
      leveled = true;
    }

    if (leveled) {
      const channelId = levels.levelUpChannelId || message.channel.id;
      await sendEmbed(channelId, message.guild, 'Level Up!', `${message.author} reached **Level ${stats.level}**.`, LARIX_GREEN);
      if (levels.rewardRoleId && message.member) await message.member.roles.add(levels.rewardRoleId).catch(() => null);
    }
  }

  await stats.save();
}

async function punish(message, settings, reason, options = {}) {
  const automod = settings.automod || {};
  const member = message.member;
  const punishment = options.punishment || 'Warn';
  const muteMinutes = numberValue(options.muteMinutes, 10);

  if (options.deleteMessage !== false && message.deletable) await message.delete().catch(() => null);

  if (punishment === 'Warn' || options.warn) {
    const key = `${message.guild.id}:${message.author.id}`;
    warnings.set(key, (warnings.get(key) || 0) + 1);
    await MemberStats.findOneAndUpdate(
      { guildId: message.guild.id, userId: message.author.id },
      { $inc: { warnings: 1 }, $setOnInsert: { guildId: message.guild.id, userId: message.author.id } },
      { upsert: true }
    ).catch(() => null);
    await message.channel.send({ content: `${message.author}, warning: ${reason}` }).catch(() => null);
  }

  if ((punishment === 'Tempmute' || punishment === 'Mute') && member) {
    if (automod.muteRoleId) await member.roles.add(automod.muteRoleId, reason).catch(() => null);
    await member.timeout(muteMinutes * 60 * 1000, reason).catch(() => null);
  }

  if (punishment === 'Kick' && member?.kickable) await member.kick(reason).catch(() => null);

  await sendEmbed(
    automod.defaultLogChannelId || settings.logging?.defaultLogChannelId || settings.logChannelId,
    message.guild,
    'Automod Action',
    `User: ${message.author.tag}\nChannel: ${message.channel}\nReason: ${reason}\nPunishment: ${punishment}`,
    LARIX_RED
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

async function handleCommand(interaction) {
  await connectDatabase();
  const settings = await settingsFor(interaction.guild);
  const name = interaction.commandName;

  if (name === 'help') {
    return interaction.reply({ embeds: [larixEmbed('Larix Bot Commands', '`/rank` check level\n`/level check` check level\n`/level leaderboard` show top users\n`/suggestion send` send suggestion\n`/embed` send embed\n`/warn` warn member\n`/mute` timeout member\n`/clear` clear messages\n`/settings` dashboard info', LARIX_BLUE)], ephemeral: true });
  }

  if (name === 'settings') {
    return interaction.reply({ embeds: [larixEmbed('Larix Dashboard', `Backend connected.\nGuild: **${interaction.guild.name}**\nDashboard controls automod, logging, levels, embeds, tickets, and more.`, LARIX_BLUE)], ephemeral: true });
  }

  if (name === 'rank' || (name === 'level' && interaction.options.getSubcommand() === 'check')) {
    const user = interaction.options.getUser('user') || interaction.user;
    const stats = await getMemberStats(interaction.guild.id, user.id);
    const nextXp = xpForLevel(stats.level + 1);
    return interaction.reply({ embeds: [larixEmbed(`${user.username}'s Rank`, `Level: **${stats.level}**\nXP: **${stats.xp}/${nextXp}**\nMessages: **${stats.messages}**\nWarnings: **${stats.warnings}**`, LARIX_BLUE)] });
  }

  if (name === 'leaderboard' || (name === 'level' && interaction.options.getSubcommand() === 'leaderboard')) {
    const top = await MemberStats.find({ guildId: interaction.guild.id }).sort({ level: -1, xp: -1 }).limit(10);
    const lines = await Promise.all(top.map(async (entry, index) => {
      const user = await client.users.fetch(entry.userId).catch(() => null);
      return `**${index + 1}.** ${user?.tag || entry.userId} — Level ${entry.level}, ${entry.xp} XP`;
    }));
    return interaction.reply({ embeds: [larixEmbed('Larix Level Leaderboard', lines.join('\n') || 'No XP yet.', LARIX_BLUE)] });
  }

  if (name === 'embed') {
    const channel = interaction.options.getChannel('channel') || interaction.channel;
    const color = parseInt((interaction.options.getString('color') || '#ff3131').replace('#', ''), 16);
    const embed = new EmbedBuilder()
      .setTitle(interaction.options.getString('title') || 'Larix Network')
      .setDescription(interaction.options.getString('description') || '')
      .setColor(Number.isFinite(color) ? color : LARIX_RED)
      .setTimestamp();
    const image = interaction.options.getString('image_url');
    const thumbnail = interaction.options.getString('thumbnail_url');
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);
    await channel.send({ embeds: [embed] });
    return interaction.reply({ content: 'Embed sent.', ephemeral: true });
  }

  if (name === 'suggestion') {
    const sub = interaction.options.getSubcommand();
    if (sub === 'setup') {
      const channel = interaction.options.getChannel('channel');
      const staffRole = interaction.options.getRole('staff_role');
      settings.suggestions = { ...(settings.suggestions || {}), enabled: true, channelId: channel.id, staffRoleId: staffRole?.id || '' };
      await settings.save();
      return interaction.reply({ content: `Suggestions set to ${channel}.`, ephemeral: true });
    }
    if (sub === 'send') {
      const text = interaction.options.getString('text');
      const channel = await interaction.guild.channels.fetch(settings.suggestions?.channelId || interaction.channel.id).catch(() => interaction.channel);
      const msg = await channel.send({ embeds: [larixEmbed('New Suggestion', `${interaction.user}\n\n${text}`, LARIX_YELLOW)] });
      await msg.react('✅').catch(() => null);
      await msg.react('❌').catch(() => null);
      return interaction.reply({ content: 'Suggestion sent.', ephemeral: true });
    }
    return interaction.reply({ content: 'Suggestion reviewed.', ephemeral: true });
  }

  if (name === 'warn') {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await MemberStats.findOneAndUpdate({ guildId: interaction.guild.id, userId: user.id }, { $inc: { warnings: 1 }, $setOnInsert: { guildId: interaction.guild.id, userId: user.id } }, { upsert: true });
    await sendEmbed(settings.logging?.memberLogChannelId || settings.logging?.defaultLogChannelId || settings.logChannelId, interaction.guild, 'Member Warned', `${user.tag}\nReason: ${reason}`, LARIX_YELLOW);
    return interaction.reply({ content: `${user} was warned.`, ephemeral: true });
  }

  if (name === 'mute') {
    const user = interaction.options.getUser('user');
    const minutes = interaction.options.getInteger('minutes') || 10;
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);
    if (!member) return interaction.reply({ content: 'Member not found.', ephemeral: true });
    await member.timeout(minutes * 60 * 1000, reason);
    return interaction.reply({ content: `${user} was muted for ${minutes} minutes.`, ephemeral: true });
  }

  if (name === 'clear') {
    const amount = Math.max(1, Math.min(100, interaction.options.getInteger('amount')));
    const deleted = await interaction.channel.bulkDelete(amount, true);
    return interaction.reply({ content: `Deleted ${deleted.size} messages.`, ephemeral: true });
  }
}

client.once('ready', async () => {
  await connectDatabase().catch(error => console.error('Database connection failed:', error.message));
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  try {
    await handleCommand(interaction);
  } catch (error) {
    console.error(error);
    const payload = { content: `Command failed: ${error.message}`, ephemeral: true };
    if (interaction.replied || interaction.deferred) await interaction.followUp(payload).catch(() => null);
    else await interaction.reply(payload).catch(() => null);
  }
});

client.on('messageCreate', async message => {
  if (!message.guild || message.author.bot) return;
  const settings = await settingsFor(message.guild).catch(() => null);
  if (!settings) return;

  await addXp(message, settings).catch(() => null);

  const automod = settings.automod || {};
  if (!bool(automod.enabled, true)) return;
  if (hasManagerPerms(message.member)) return;
  if (channelAllowed(message, automod)) return;

  const content = message.content || '';
  const clean = normalize(content);

  const mediaOnly = arr(automod.mediaOnlyChannels);
  if (mediaOnly.includes(message.channel.id) && message.attachments.size === 0) return punish(message, settings, 'Media-only channel requires an attachment.', { punishment: 'Delete message' });

  if (bool(automod.deleteScaryFiles, true)) {
    const risky = message.attachments.some(file => riskyFileTypes.some(type => file.name?.toLowerCase().endsWith(type)));
    if (risky) return punish(message, settings, 'Blocked risky file attachment.', { punishment: 'Delete message' });
  }

  const honeypotChannels = arr(automod.honeypotChannels || automod.honeypot?.channels);
  if (bool(automod.honeypotEnabled, false) && honeypotChannels.includes(message.channel.id)) return punish(message, settings, 'Honeypot channel triggered.', { punishment: automod.honeypotPunishment || 'Mute' });

  const inviteRegex = /(discord\.gg|discord\.com\/invite|discordapp\.com\/invite)\//i;
  if (bool(automod.inviteSpamEnabled, automod.antiInvites ?? true) && inviteRegex.test(content)) return punish(message, settings, 'Discord invite detected.', { punishment: automod.inviteSpamPunishment || 'Tempmute', muteMinutes: automod.inviteSpamMuteMinutes });

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
  if (bool(automod.badWordsEnabled, true) && blocked.some(word => clean.includes(normalize(word)))) return punish(message, settings, 'Blocked word detected.', { punishment: automod.badWordsPunishment || 'Tempmute', muteMinutes: automod.badWordsMuteMinutes });

  if (bool(automod.mentionSpamEnabled, true)) {
    const mentions = message.mentions.users.size + message.mentions.roles.size;
    if (mentions >= numberValue(automod.mentionSpamThreshold, 4)) return punish(message, settings, 'Mention spam detected.', { punishment: automod.mentionSpamPunishment || 'Tempmute', muteMinutes: automod.mentionSpamMuteMinutes });
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
  await sendEmbed(logChannel(settings, 'message'), message.guild, 'Message Deleted', `Channel: ${message.channel}\nAuthor: ${message.author?.tag || 'Unknown'}\nContent: ${message.content || 'Unavailable'}`, LARIX_RED);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  if (!newMessage.guild || newMessage.author?.bot) return;
  const settings = await settingsFor(newMessage.guild).catch(() => null);
  if (!settings?.logging?.editedMessages) return;
  await sendEmbed(logChannel(settings, 'message'), newMessage.guild, 'Message Edited', `Channel: ${newMessage.channel}\nAuthor: ${newMessage.author?.tag || 'Unknown'}\nBefore: ${oldMessage.content || 'Unavailable'}\nAfter: ${newMessage.content || 'Unavailable'}`, LARIX_YELLOW);
});

client.on('guildMemberAdd', member => logEvent(member.guild, 'joinLeave', 'Member Joined', `${member.user.tag} joined the server.`, LARIX_GREEN));
client.on('guildMemberRemove', member => logEvent(member.guild, 'joinLeave', 'Member Left', `${member.user.tag} left the server.`, 0xe67e22));
client.on('guildBanAdd', ban => logEvent(ban.guild, 'member', 'Member Banned', `${ban.user.tag} was banned.`, LARIX_RED));
client.on('guildBanRemove', ban => logEvent(ban.guild, 'member', 'Member Unbanned', `${ban.user.tag} was unbanned.`, LARIX_GREEN));
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const settings = await settingsFor(newMember.guild).catch(() => null);
  if (!settings?.logging?.enabled) return;
  if (settings.logging.memberRoleUpdates && oldMember.roles.cache.size !== newMember.roles.cache.size) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Member Roles Updated', `${newMember.user.tag} roles changed.`, LARIX_BLUE);
  if (settings.logging.nameChanges && oldMember.displayName !== newMember.displayName) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Name Changed', `${oldMember.displayName} → ${newMember.displayName}`, LARIX_BLUE);
  if (settings.logging.memberTimeout && !oldMember.communicationDisabledUntil && newMember.communicationDisabledUntil) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Member Timed Out', `${newMember.user.tag} was timed out.`, LARIX_YELLOW);
  if (settings.logging.memberRemoveTimeout && oldMember.communicationDisabledUntil && !newMember.communicationDisabledUntil) await sendEmbed(logChannel(settings, 'member'), newMember.guild, 'Timeout Removed', `${newMember.user.tag} timeout removed.`, LARIX_GREEN);
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  const guild = newState.guild || oldState.guild;
  const settings = await settingsFor(guild).catch(() => null);
  if (!settings?.logging?.enabled) return;
  const member = newState.member || oldState.member;
  if (!oldState.channelId && newState.channelId && settings.logging.voiceJoin) await sendEmbed(logChannel(settings, 'voice'), guild, 'Voice Joined', `${member.user.tag} joined <#${newState.channelId}>.`, LARIX_GREEN);
  if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId && settings.logging.voiceMove) await sendEmbed(logChannel(settings, 'voice'), guild, 'Voice Moved', `${member.user.tag} moved from <#${oldState.channelId}> to <#${newState.channelId}>.`, LARIX_BLUE);
  if (oldState.channelId && !newState.channelId && settings.logging.voiceLeave) await sendEmbed(logChannel(settings, 'voice'), guild, 'Voice Left', `${member.user.tag} left <#${oldState.channelId}>.`, 0xe67e22);
});

client.on('channelCreate', channel => channel.guild && logEvent(channel.guild, 'server', 'Channel Created', `${channel.name} was created.`, LARIX_GREEN));
client.on('channelUpdate', (oldChannel, newChannel) => newChannel.guild && logEvent(newChannel.guild, 'server', 'Channel Updated', `${newChannel.name} was updated.`, LARIX_BLUE));
client.on('channelDelete', channel => channel.guild && logEvent(channel.guild, 'server', 'Channel Deleted', `${channel.name} was deleted.`, LARIX_RED));
client.on('roleCreate', role => logEvent(role.guild, 'server', 'Role Created', `${role.name} was created.`, LARIX_GREEN));
client.on('roleUpdate', (oldRole, newRole) => logEvent(newRole.guild, 'server', 'Role Updated', `${newRole.name} was updated.`, LARIX_BLUE));
client.on('roleDelete', role => logEvent(role.guild, 'server', 'Role Deleted', `${role.name} was deleted.`, LARIX_RED));
client.on('guildUpdate', (oldGuild, newGuild) => logEvent(newGuild, 'server', 'Server Updated', `${newGuild.name} was updated.`, LARIX_BLUE));
client.on('emojiCreate', emoji => logEvent(emoji.guild, 'server', 'Emoji Created', `${emoji.name} was created.`, LARIX_GREEN));
client.on('emojiUpdate', (oldEmoji, newEmoji) => logEvent(newEmoji.guild, 'server', 'Emoji Updated', `${newEmoji.name} was updated.`, LARIX_BLUE));
client.on('emojiDelete', emoji => logEvent(emoji.guild, 'server', 'Emoji Deleted', `${emoji.name} was deleted.`, LARIX_RED));

client.login(process.env.BOT_TOKEN);
