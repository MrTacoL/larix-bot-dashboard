export const guildId = process.env.NEXT_PUBLIC_GUILD_ID || '1357145785506074825';

export const navGroups = [
  {
    title: 'Core',
    items: [
      ['Overview', 'LayoutDashboard', '/'],
      ['Welcome', 'DoorOpen', '/welcome'],
      ['Moderation', 'Shield', '/moderation'],
      ['Logging', 'ScrollText', '/logging'],
      ['Levels', 'Trophy', '/levels'],
      ['Achievements', 'Award', '/achievements']
    ]
  },
  {
    title: 'Community',
    items: [
      ['Suggestions', 'MessageSquarePlus', '/suggestions'],
      ['Tickets', 'LifeBuoy', '/tickets'],
      ['Reaction Roles', 'BadgeCheck', '/reaction-roles'],
      ['Starboard', 'Star', '/starboards'],
      ['Polls', 'BarChart3', '/polls'],
      ['Invites', 'UserPlus', '/invites']
    ]
  },
  {
    title: 'Tools',
    items: [
      ['Automod', 'ScanLine', '/automod'],
      ['Commands', 'TerminalSquare', '/commands'],
      ['Embeds', 'PanelTop', '/embeds'],
      ['Reminders', 'AlarmClock', '/reminders'],
      ['Search', 'Search', '/search'],
      ['Statistics', 'Activity', '/statistics'],
      ['Temp Voice', 'Volume2', '/temporary-channels'],
      ['Automation', 'Workflow', '/automations'],
      ['Help', 'CircleHelp', '/help']
    ]
  }
];

export const modules = {
  welcome: {
    title: 'Welcome', path: '/welcome', section: 'welcome', icon: 'DoorOpen',
    description: 'Join messages, leave messages, DMs, and autoroles.', stats: ['Autorole ready', 'Template messages', 'DM optional'],
    fields: [
      { name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false },
      { name: 'channelId', label: 'Welcome channel ID' },
      { name: 'goodbyeChannelId', label: 'Goodbye channel ID' },
      { name: 'autoRoleId', label: 'Auto role ID' },
      { name: 'message', label: 'Welcome message', type: 'textarea', defaultValue: 'Welcome {user} to {server}.' },
      { name: 'goodbyeMessage', label: 'Goodbye message', type: 'textarea', defaultValue: '{user} left {server}.' },
      { name: 'dmMessage', label: 'DM message', type: 'textarea' },
      { name: 'imageUrl', label: 'Welcome image URL' }
    ]
  },
  moderation: {
    title: 'Moderation', path: '/moderation', section: 'moderation', icon: 'Shield',
    description: 'Case logs, mute role, trusted staff roles, and warning thresholds.', stats: ['Cases saved', 'Timeout support', 'Staff roles'],
    fields: [
      { name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true },
      { name: 'caseLogChannelId', label: 'Case log channel ID' },
      { name: 'muteRoleId', label: 'Mute role ID' },
      { name: 'modRoleIds', label: 'Moderator role IDs', type: 'list' },
      { name: 'dramaChannelId', label: 'Drama channel ID' },
      { name: 'warnThreshold', label: 'Warning threshold', type: 'number', defaultValue: 3 },
      { name: 'thresholdAction', label: 'Threshold action', type: 'select', options: ['timeout', 'kick', 'ban'], defaultValue: 'timeout' },
      { name: 'thresholdMuteMinutes', label: 'Threshold timeout minutes', type: 'number', defaultValue: 30 }
    ]
  },
  automod: {
    title: 'Automod', path: '/automod', section: 'automod', icon: 'ScanLine',
    description: 'Spam, invites, links, words, mentions, files, caps, and honeypots.', stats: ['Spam windows', 'Allow lists', 'Punishments'],
    fields: [
      { name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true },
      { name: 'defaultLogChannelId', label: 'Automod log channel ID' },
      { name: 'ignoredChannelIds', label: 'Ignored channel IDs', type: 'list' },
      { name: 'ignoredRoleIds', label: 'Ignored role IDs', type: 'list' },
      { name: 'allowedDomains', label: 'Allowed domains', type: 'list', defaultValue: ['discord.com', 'youtube.com', 'twitch.tv'] },
      { name: 'blockedWords', label: 'Blocked words', type: 'list' },
      { name: 'mediaOnlyChannelIds', label: 'Media-only channel IDs', type: 'list' },
      { name: 'honeypotChannelIds', label: 'Honeypot channel IDs', type: 'list' },
      { name: 'antiInvite.enabled', label: 'Block Discord invites', type: 'switch', defaultValue: true },
      { name: 'antiInvite.punishment', label: 'Invite punishment', type: 'select', options: ['delete', 'warn', 'timeout', 'kick'], defaultValue: 'timeout' },
      { name: 'antiLink.enabled', label: 'Block unknown links', type: 'switch', defaultValue: true },
      { name: 'badWords.enabled', label: 'Block bad words', type: 'switch', defaultValue: true },
      { name: 'spam.threshold', label: 'Spam threshold', type: 'number', defaultValue: 6 },
      { name: 'spam.windowSeconds', label: 'Spam window seconds', type: 'number', defaultValue: 5 },
      { name: 'mentions.threshold', label: 'Mention threshold', type: 'number', defaultValue: 5 },
      { name: 'caps.enabled', label: 'Caps filter', type: 'switch', defaultValue: false },
      { name: 'caps.threshold', label: 'Caps percent', type: 'number', defaultValue: 70 }
    ]
  },
  logging: {
    title: 'Logging', path: '/logging', section: 'logging', icon: 'ScrollText',
    description: 'Route server, member, message, and voice events to staff channels.', stats: ['Message edits', 'Voice moves', 'Role changes'],
    fields: [
      { name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true },
      { name: 'defaultLogChannelId', label: 'Default log channel ID' },
      { name: 'memberLogChannelId', label: 'Member log channel ID' },
      { name: 'serverLogChannelId', label: 'Server log channel ID' },
      { name: 'messageLogChannelId', label: 'Message log channel ID' },
      { name: 'voiceLogChannelId', label: 'Voice log channel ID' },
      { name: 'ignoredChannelIds', label: 'Ignored channel IDs', type: 'list' },
      { name: 'deletedMessages', label: 'Deleted messages', type: 'switch', defaultValue: true },
      { name: 'editedMessages', label: 'Edited messages', type: 'switch', defaultValue: true },
      { name: 'memberJoins', label: 'Member joins', type: 'switch', defaultValue: true },
      { name: 'memberLeaves', label: 'Member leaves', type: 'switch', defaultValue: true },
      { name: 'voiceEvents', label: 'Voice events', type: 'switch', defaultValue: true },
      { name: 'channelChanges', label: 'Channel changes', type: 'switch', defaultValue: true },
      { name: 'roleEvents', label: 'Role events', type: 'switch', defaultValue: true }
    ]
  },
  levels: {
    title: 'Levels', path: '/levels', section: 'levels', icon: 'Trophy',
    description: 'XP, rank cards, leaderboards, cooldowns, and reward roles.', stats: ['XP engine', 'Leaderboard', 'Rewards'],
    fields: [
      { name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true },
      { name: 'levelUpChannelId', label: 'Level-up channel ID' },
      { name: 'xpPerMessage', label: 'XP per message', type: 'number', defaultValue: 15 },
      { name: 'cooldownSeconds', label: 'XP cooldown seconds', type: 'number', defaultValue: 60 },
      { name: 'rewardRoleId', label: 'Reward role ID' },
      { name: 'ignoredChannelIds', label: 'Ignored channel IDs', type: 'list' },
      { name: 'ignoredRoleIds', label: 'Ignored role IDs', type: 'list' }
    ]
  },
  achievements: { title: 'Achievements', path: '/achievements', section: 'achievements', icon: 'Award', description: 'Reward member milestones for chat, level, voice, and invites.', stats: ['Message goals', 'Voice goals', 'Role reward'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true }, { name: 'announceChannelId', label: 'Announcement channel ID' }, { name: 'roleRewardId', label: 'Reward role ID' }] },
  suggestions: { title: 'Suggestions', path: '/suggestions', section: 'suggestions', icon: 'MessageSquarePlus', description: 'Suggestion channel, staff pings, and review colors.', stats: ['Approve flow', 'Deny flow', 'Staff role'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true }, { name: 'channelId', label: 'Suggestion channel ID' }, { name: 'staffRoleId', label: 'Staff role ID' }, { name: 'pendingColor', label: 'Pending color', defaultValue: '#d97706' }, { name: 'approvedColor', label: 'Approved color', defaultValue: '#16a34a' }, { name: 'deniedColor', label: 'Denied color', defaultValue: '#dc2626' }] },
  tickets: { title: 'Tickets', path: '/tickets', section: 'tickets', icon: 'LifeBuoy', description: 'Private support channels with panel buttons and transcripts.', stats: ['Panel button', 'Private rooms', 'Transcripts'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'categoryId', label: 'Ticket category ID' }, { name: 'staffRoleId', label: 'Staff role ID' }, { name: 'transcriptChannelId', label: 'Transcript channel ID' }, { name: 'panelChannelId', label: 'Panel channel ID' }, { name: 'panelMessage', label: 'Panel message', type: 'textarea', defaultValue: 'Need help? Open a ticket and staff will be with you.' }, { name: 'ticketName', label: 'Ticket channel name', defaultValue: 'ticket-{user}' }] },
  reactionRoles: { title: 'Reaction Roles', path: '/reaction-roles', section: 'reactionRoles', icon: 'BadgeCheck', description: 'Button panels that let members add or remove roles.', stats: ['Button roles', 'Role toggle', 'Panel title'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'panelChannelId', label: 'Panel channel ID' }, { name: 'panelTitle', label: 'Panel title', defaultValue: 'Reaction Roles' }] },
  starboards: { title: 'Starboard', path: '/starboards', section: 'starboards', icon: 'Star', description: 'Highlight popular messages after enough star reactions.', stats: ['Message links', 'Thresholds', 'Ignored channels'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'channelId', label: 'Starboard channel ID' }, { name: 'emoji', label: 'Emoji name', defaultValue: 'star' }, { name: 'requiredStars', label: 'Required stars', type: 'number', defaultValue: 3 }, { name: 'ignoredChannelIds', label: 'Ignored channel IDs', type: 'list' }] },
  polls: { title: 'Polls', path: '/polls', section: 'polls', icon: 'BarChart3', description: 'Slash command polls with choice buttons.', stats: ['Choices', 'Votes', 'Results'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true }, { name: 'defaultChannelId', label: 'Default poll channel ID' }, { name: 'managerRoleId', label: 'Poll manager role ID' }] },
  inviteTracker: { title: 'Invite Tracker', path: '/invites', section: 'inviteTracker', icon: 'UserPlus', description: 'Track invite growth and give milestone roles.', stats: ['Invite cache', 'Growth logs', 'Role reward'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'channelId', label: 'Invite log channel ID' }, { name: 'rewardRoleId', label: 'Reward role ID' }, { name: 'requiredInvites', label: 'Required invites', type: 'number', defaultValue: 5 }] },
  automations: { title: 'Automations', path: '/automations', section: 'automations', icon: 'Workflow', description: 'Reusable server actions for onboarding and rules flows.', stats: ['Join role', 'Boost alerts', 'Rules post'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'joinRoleId', label: 'Join role ID' }, { name: 'boostChannelId', label: 'Boost alert channel ID' }, { name: 'rulesChannelId', label: 'Rules channel ID' }, { name: 'rulesMessage', label: 'Rules message', type: 'textarea' }] },
  customCommands: { title: 'Commands', path: '/commands', section: 'customCommands', icon: 'TerminalSquare', description: 'Prefix commands for quick replies and staff utilities.', stats: ['Prefix replies', 'Manager role', 'Saved commands'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'prefix', label: 'Prefix', defaultValue: '!' }, { name: 'managerRoleId', label: 'Manager role ID' }] },
  reminders: { title: 'Reminders', path: '/reminders', section: 'reminders', icon: 'AlarmClock', description: 'Scheduled reminders for members and staff.', stats: ['Timed sends', 'Max window', 'Channel route'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true }, { name: 'channelId', label: 'Reminder channel ID' }, { name: 'maxHours', label: 'Maximum hours', type: 'number', defaultValue: 168 }] },
  search: { title: 'Search', path: '/search', section: 'search', icon: 'Search', description: 'Recent message search from slash commands.', stats: ['Channel scan', 'Result links', 'Private replies'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true }, { name: 'allowWebLinks', label: 'Allow web links', type: 'switch', defaultValue: true }] },
  statisticsChannels: { title: 'Statistics', path: '/statistics', section: 'statisticsChannels', icon: 'Activity', description: 'Member and bot count channel names updated by the bot.', stats: ['Member count', 'Bot count', 'Interval'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'categoryId', label: 'Stats category ID' }, { name: 'memberCountChannelId', label: 'Member count channel ID' }, { name: 'botCountChannelId', label: 'Bot count channel ID' }, { name: 'intervalMinutes', label: 'Interval minutes', type: 'number', defaultValue: 30 }] },
  temporaryChannels: { title: 'Temp Voice', path: '/temporary-channels', section: 'temporaryChannels', icon: 'Volume2', description: 'Join-to-create voice channels with automatic cleanup.', stats: ['Voice lobby', 'User limits', 'Cleanup'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: false }, { name: 'lobbyChannelId', label: 'Lobby voice channel ID' }, { name: 'categoryId', label: 'Temporary voice category ID' }, { name: 'defaultName', label: 'Default channel name', defaultValue: '{user} voice' }, { name: 'userLimit', label: 'User limit', type: 'number', defaultValue: 5 }] },
  help: { title: 'Help', path: '/help', section: 'help', icon: 'CircleHelp', description: 'Support channel, role, and default help message.', stats: ['Support role', 'Help text', 'Channel route'], fields: [{ name: 'enabled', label: 'Enabled', type: 'switch', defaultValue: true }, { name: 'channelId', label: 'Help channel ID' }, { name: 'supportRoleId', label: 'Support role ID' }, { name: 'message', label: 'Help message', type: 'textarea', defaultValue: 'Use /help to see Larix commands.' }]
  }
};

export const moduleList = Object.values(modules);
