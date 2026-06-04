import mongoose from 'mongoose';

let cached = globalThis.__larixMongoose;
if (!cached) cached = globalThis.__larixMongoose = { conn: null, promise: null };

export async function connectDatabase(uri) {
  const connectionString = uri || process.env.MONGODB_URI || process.env.DB_URL;
  if (!connectionString) throw new Error('Missing database connection string');
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(connectionString, { dbName: 'larix_bot' });
  cached.conn = await cached.promise;
  return cached.conn;
}
