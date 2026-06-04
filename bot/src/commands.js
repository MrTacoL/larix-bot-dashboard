import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const commands = [
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show Larix Bot commands and modules'),

  new SlashCommandBuilder()
    .setName('rank')
    .setDescription('Check your level, XP, and message stats')
    .addUserOption(opt => opt.setName('user').setDescription('User to check').setRequired(false)),

  new SlashCommandBuilder()
    .setName('level')
    .setDescription('Level system commands')
    .addSubcommand(sub => sub
      .setName('check')
      .setDescription('Check a user level')
      .addUserOption(opt => opt.setName('user').setDescription('User to check').setRequired(false)))
    .addSubcommand(sub => sub
      .setName('leaderboard')
      .setDescription('Show the top Larix levels')),

  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Show the top Larix levels'),

  new SlashCommandBuilder()
    .setName('suggestion')
    .setDescription('Suggestion system')
    .addSubcommand(sub => sub
      .setName('send')
      .setDescription('Send a suggestion')
      .addStringOption(opt => opt.setName('text').setDescription('Your suggestion').setRequired(true)))
    .addSubcommand(sub => sub
      .setName('setup')
      .setDescription('Set the suggestions channel')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .addChannelOption(opt => opt.setName('channel').setDescription('Suggestion channel').setRequired(true))
      .addRoleOption(opt => opt.setName('staff_role').setDescription('Staff role to ping').setRequired(false)))
    .addSubcommand(sub => sub
      .setName('approve')
      .setDescription('Approve a suggestion message')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addStringOption(opt => opt.setName('message_id').setDescription('Suggestion message ID').setRequired(true))
      .addStringOption(opt => opt.setName('reason').setDescription('Reason').setRequired(false)))
    .addSubcommand(sub => sub
      .setName('deny')
      .setDescription('Deny a suggestion message')
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addStringOption(opt => opt.setName('message_id').setDescription('Suggestion message ID').setRequired(true))
      .addStringOption(opt => opt.setName('reason').setDescription('Reason').setRequired(false))),

  new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Send a custom embed')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption(opt => opt.setName('title').setDescription('Embed title').setRequired(false))
    .addStringOption(opt => opt.setName('description').setDescription('Embed description').setRequired(false))
    .addStringOption(opt => opt.setName('color').setDescription('Hex color, example #ff3131').setRequired(false))
    .addStringOption(opt => opt.setName('image_url').setDescription('Large image URL').setRequired(false))
    .addStringOption(opt => opt.setName('thumbnail_url').setDescription('Thumbnail image URL').setRequired(false))
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel to send in').setRequired(false)),

  new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(opt => opt.setName('user').setDescription('Member to warn').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Warning reason').setRequired(false)),

  new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Temporarily mute a member')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(opt => opt.setName('user').setDescription('Member to mute').setRequired(true))
    .addIntegerOption(opt => opt.setName('minutes').setDescription('Mute duration in minutes').setRequired(false))
    .addStringOption(opt => opt.setName('reason').setDescription('Mute reason').setRequired(false)),

  new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete messages from this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(opt => opt.setName('amount').setDescription('Amount from 1 to 100').setRequired(true)),

  new SlashCommandBuilder()
    .setName('settings')
    .setDescription('Show Larix dashboard connection info')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
];

export const commandJson = commands.map(command => command.toJSON());
