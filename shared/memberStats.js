import mongoose from 'mongoose';

const memberStatsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  messages: { type: Number, default: 0 },
  lastXpAt: { type: Number, default: 0 },
  warnings: { type: Number, default: 0 }
}, { timestamps: true });

memberStatsSchema.index({ guildId: 1, userId: 1 }, { unique: true });

export const MemberStats = mongoose.models.MemberStats || mongoose.model('MemberStats', memberStatsSchema);

export function xpForLevel(level) {
  return Math.floor(100 * level * level);
}

export async function getMemberStats(guildId, userId) {
  return MemberStats.findOneAndUpdate(
    { guildId, userId },
    { $setOnInsert: { guildId, userId } },
    { upsert: true, new: true }
  );
}
