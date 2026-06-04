import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const commands = [
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
      .addChannelOption(opt => opt.setName('channel').setDescription('Suggestion channel').setRequired(true))
      .addRoleOption(opt => opt.setName('staff_role').setDescription('Staff role to ping').setRequired(false)))
    .addSubcommand(sub => sub
      .setName('approve')
      .setDescription('Approve a suggestion message')
      .addStringOption(opt => opt.setName('message_id').setDescription('Suggestion message ID').setRequired(true))
      .addStringOption(opt => opt.setName('reason').setDescription('Reason').setRequired(false)))
    .addSubcommand(sub => sub
      .setName('deny')
      .setDescription('Deny a suggestion message')
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
    .addChannelOption(opt => opt.setName('channel').setDescription('Channel to send in').setRequired(false))
];

export const commandJson = commands.map(command => command.toJSON());
