import AdvancedSettingsPage from '../components/AdvancedSettingsPage';

const punishmentOptions = ['None', 'Delete message', 'Warn', 'Tempmute', 'Mute', 'Kick'];

export default function ModerationPage() {
  return <AdvancedSettingsPage
    title="Automod"
    subtitle="Members with Manage Server or Administrator are always immune. Set channels, roles, whitelists, spam rules, and punishments for Larix Kit."
    section="automod"
    activePath="/moderation"
    groups={[
      {
        title: 'General Settings',
        text: 'Main automod routing and immunity settings. Use IDs for channels, categories, and roles until live Discord pickers are added.',
        fields: [
          { key: 'enabled', label: 'Enable Automod', type: 'checkbox', value: true },
          { key: 'defaultLogChannelId', label: 'Log actions to Channel ID', placeholder: 'Example: 1234567890' },
          { key: 'dramaChannelId', label: 'Drama Channel ID', placeholder: 'Optional channel for flagged drama' },
          { key: 'muteRoleId', label: 'Mute Role ID', placeholder: 'Muted role ID' },
          { key: 'allowedChannels', label: 'Allowed Channels/Categories, one ID per line', type: 'textarea' },
          { key: 'allowedRoles', label: 'Allowed Roles, one ID per line', type: 'textarea' },
          { key: 'mediaOnlyChannels', label: 'Media Only Channels, one ID per line', type: 'textarea' },
          { key: 'deleteScaryFiles', label: 'Delete scary files', type: 'checkbox', value: true }
        ]
      },
      {
        title: 'Invite Spam',
        text: 'Catches Discord invite spam and bad invites.',
        fields: [
          { key: 'inviteSpamEnabled', label: 'Enable Invite Spam', type: 'checkbox', value: true },
          { key: 'inviteSpamPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Tempmute' },
          { key: 'inviteSpamMuteMinutes', label: 'Mute Minutes', value: '10' }
        ]
      },
      {
        title: 'Mention Spam',
        text: 'Stops users from mass mentioning members or roles.',
        fields: [
          { key: 'mentionSpamEnabled', label: 'Enable Mention Spam', type: 'checkbox', value: true },
          { key: 'mentionSpamPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Tempmute' },
          { key: 'mentionSpamMuteMinutes', label: 'Mute Minutes', value: '5' },
          { key: 'mentionSpamThreshold', label: 'Punish after mentions', value: '4' },
          { key: 'mentionSpamWindowSeconds', label: 'In seconds', value: '6' }
        ]
      },
      {
        title: 'Attachment Spam',
        text: 'Stops users from spamming files and attachments.',
        fields: [
          { key: 'attachmentSpamEnabled', label: 'Enable Attachment Spam', type: 'checkbox', value: true },
          { key: 'attachmentSpamPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Tempmute' },
          { key: 'attachmentSpamMuteMinutes', label: 'Mute Minutes', value: '5' },
          { key: 'attachmentSpamThreshold', label: 'Punish after files', value: '4' },
          { key: 'attachmentSpamWindowSeconds', label: 'In seconds', value: '15' }
        ]
      },
      {
        title: 'Caps',
        text: 'Deletes or punishes messages with too many capital letters.',
        fields: [
          { key: 'capsEnabled', label: 'Enable Caps Filter', type: 'checkbox', value: false },
          { key: 'capsPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Delete message' },
          { key: 'capsThreshold', label: 'Punish after messages', value: '0' },
          { key: 'capsLimit', label: 'Caps limit percent', value: '70' }
        ]
      },
      {
        title: 'Honeypot',
        text: 'Users sending messages in these channels automatically trigger punishment.',
        fields: [
          { key: 'honeypotEnabled', label: 'Enable Honeypot', type: 'checkbox', value: false },
          { key: 'honeypotChannels', label: 'Honeypot Channel IDs, one per line', type: 'textarea' },
          { key: 'honeypotPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Mute' }
        ]
      },
      {
        title: 'Link Spam',
        text: 'Links not on the whitelist count as an infraction.',
        fields: [
          { key: 'linkSpamEnabled', label: 'Enable Link Spam', type: 'checkbox', value: true },
          { key: 'linkSpamMode', label: 'Linkspam Mode', type: 'select', options: ['No roles', 'Whitelist only', 'Block all links', 'Allowed roles bypass'], value: 'No roles' },
          { key: 'whitelistedDomains', label: 'Whitelisted Domains, one per line', type: 'textarea', value: 'youtube.com\nyoutu.be\ngoogle.com\ndiscord.com\ndiscordapp.com\nreddit.com\ntenor.com\ntwitter.com\nfacebook.com' },
          { key: 'linkSpamPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Tempmute' },
          { key: 'linkSpamMuteMinutes', label: 'Mute Minutes', value: '10' },
          { key: 'linkSpamThreshold', label: 'Punish after links', value: '1' },
          { key: 'linkSpamWindowSeconds', label: 'In seconds', value: '1' }
        ]
      },
      {
        title: 'Bad Words',
        text: 'Case insensitive, looks for substrings, ignores punctuation. Put one blocked word per line.',
        fields: [
          { key: 'badWordsEnabled', label: 'Enable Bad Words', type: 'checkbox', value: true },
          { key: 'blockedWords', label: 'Blocked Words, one per line', type: 'textarea' },
          { key: 'badWordsPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Tempmute' },
          { key: 'badWordsMuteMinutes', label: 'Mute Minutes', value: '10' }
        ]
      },
      {
        title: 'Spam',
        text: 'Catches repeated fast messages.',
        fields: [
          { key: 'spamEnabled', label: 'Enable Spam Filter', type: 'checkbox', value: true },
          { key: 'spamPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Tempmute' },
          { key: 'spamMuteMinutes', label: 'Mute Minutes', value: '5' },
          { key: 'spamThreshold', label: 'Punish after messages', value: '6' },
          { key: 'spamWindowSeconds', label: 'In seconds', value: '4' }
        ]
      },
      {
        title: 'Warn Threshold',
        text: 'Automatically punish users after too many warnings.',
        fields: [
          { key: 'warnThresholdEnabled', label: 'Enable Warn Threshold', type: 'checkbox', value: false },
          { key: 'warnThresholdPunishment', label: 'Punishment', type: 'select', options: punishmentOptions, value: 'Mute' },
          { key: 'warnThresholdAmount', label: 'Punish after warnings', value: '8' }
        ]
      }
    ]}
  />;
}
