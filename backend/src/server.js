import express from 'express';
import cors from 'cors';
import { connectDatabase } from '../../shared/database.js';
import { getGuildSettings, GuildSettings } from '../../shared/guildSettings.js';

const app = express();
const port = process.env.BACKEND_PORT || 4000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, name: 'Larix Backend' });
});

app.get('/api/guilds/:guildId/settings', async (req, res) => {
  await connectDatabase();
  const settings = await getGuildSettings(req.params.guildId);
  res.json(settings);
});

app.patch('/api/guilds/:guildId/settings', async (req, res) => {
  await connectDatabase();
  const settings = await GuildSettings.findOneAndUpdate(
    { guildId: req.params.guildId },
    { $set: req.body },
    { new: true, upsert: true }
  );
  res.json(settings);
});

app.post('/api/oauth/discord/start', (req, res) => {
  res.json({ message: 'Discord OAuth will be connected here next.' });
});

app.listen(port, () => console.log(`Larix backend running on ${port}`));
