import AdvancedSettingsPage from '../components/AdvancedSettingsPage';

export default function LoggingPage() {
  return <AdvancedSettingsPage
    title="Logging"
    subtitle="Route Discord events into clean log channels so staff can track messages, joins, roles, bans, voice movement, and server updates."
    section="logging"
    activePath="/logging"
    groups={[
      {
        title: 'Channel Selection',
        text: 'By default, all events go to the default log channel. Redirect noisy events into their own channels for cleaner staff logs.',
        fields: [
          { key: 'enabled', label: 'Enable Logging', type: 'checkbox', value: true },
          { key: 'defaultLogChannelId', label: 'Default Log Channel ID' },
          { key: 'memberLogChannelId', label: 'Member Log Channel ID' },
          { key: 'serverLogChannelId', label: 'Server Log Channel ID' },
          { key: 'voiceLogChannelId', label: 'Voice Log Channel ID' },
          { key: 'messageLogChannelId', label: 'Message Log Channel ID' },
          { key: 'joinLeaveLogChannelId', label: 'Join/Leave Log Channel ID' },
          { key: 'ignoredChannels', label: 'Ignored Channel IDs, one per line', type: 'textarea' }
        ]
      },
      {
        title: 'Message Events',
        text: 'Track deleted, edited, and purged messages.',
        fields: [
          { key: 'deletedMessages', label: 'Deleted messages', type: 'checkbox', value: true },
          { key: 'editedMessages', label: 'Edited messages', type: 'checkbox', value: true },
          { key: 'purgedMessages', label: 'Purged messages', type: 'checkbox', value: true }
        ]
      },
      {
        title: 'Member Movement',
        text: 'Track users joining and leaving the Discord server.',
        fields: [
          { key: 'memberJoining', label: 'Members joining', type: 'checkbox', value: true },
          { key: 'memberLeaving', label: 'Members leaving', type: 'checkbox', value: true }
        ]
      },
      {
        title: 'Server Events',
        text: 'These events relate to changes made to the server itself.',
        fields: [
          { key: 'channelCreation', label: 'Channel creation', type: 'checkbox', value: true },
          { key: 'channelUpdate', label: 'Updated channel', type: 'checkbox', value: true },
          { key: 'channelDeletion', label: 'Channel deletion', type: 'checkbox', value: true },
          { key: 'roleCreation', label: 'Role creation', type: 'checkbox', value: true },
          { key: 'roleUpdate', label: 'Role updates', type: 'checkbox', value: true },
          { key: 'roleDeletion', label: 'Role deletion', type: 'checkbox', value: true },
          { key: 'serverUpdates', label: 'Server updates', type: 'checkbox', value: true },
          { key: 'emojiChanges', label: 'Emoji changes', type: 'checkbox', value: true }
        ]
      },
      {
        title: 'Member Events',
        text: 'Track member role changes, names, avatars, bans, and timeouts.',
        fields: [
          { key: 'memberRoleUpdates', label: 'Role updates', type: 'checkbox', value: true },
          { key: 'nameChanges', label: 'Name changes', type: 'checkbox', value: true },
          { key: 'avatarChanges', label: 'Avatar changes', type: 'checkbox', value: true },
          { key: 'memberBans', label: 'Member bans', type: 'checkbox', value: true },
          { key: 'memberUnbans', label: 'Member unbans', type: 'checkbox', value: true },
          { key: 'memberTimeout', label: 'Member timeout', type: 'checkbox', value: true },
          { key: 'memberRemoveTimeout', label: 'Member remove timeout', type: 'checkbox', value: true }
        ]
      },
      {
        title: 'Voice Events',
        text: 'Track joins, moves, and leaves in voice channels.',
        fields: [
          { key: 'voiceJoin', label: 'Join voice channel', type: 'checkbox', value: true },
          { key: 'voiceMove', label: 'Move between voice channels', type: 'checkbox', value: true },
          { key: 'voiceLeave', label: 'Leave voice channel', type: 'checkbox', value: true }
        ]
      }
    ]}
  />;
}
