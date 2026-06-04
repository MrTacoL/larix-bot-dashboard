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
  try {
    await connectDatabase();
    const settings = await getGuildSettings(req.params.guildId);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/api/guilds/:guildId/settings', async (req, res) => {
  try {
    await connectDatabase();
    const settings = await GuildSettings.findOneAndUpdate(
      { guildId: req.params.guildId },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ ok: true, settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/guilds/:guildId/embed', async (req, res) => {
  try {
    const token = process.env.BOT_TOKEN;
    if (!token) return res.status(400).json({ error: 'Missing BOT_TOKEN on backend host.' });

    const { channelId, title, description, color, imageUrl, thumbnailUrl, footer } = req.body;
    if (!channelId) return res.status(400).json({ error: 'Missing channelId.' });

    const embed = {
      title: title || 'Larix Network',
      description: description || '',
      color: parseInt((color || '#ff3131').replace('#', ''), 16),
      timestamp: new Date().toISOString(),
      footer: footer ? { text: footer } : undefined,
      image: imageUrl ? { url: imageUrl } : undefined,
      thumbnail: thumbnailUrl ? { url: thumbnailUrl } : undefined
    };

    const discordRes = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bot ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ embeds: [embed] })
    });

    const data = await discordRes.json().catch(() => ({}));
    if (!discordRes.ok) return res.status(discordRes.status).json({ error: data.message || 'Discord API error', details: data });
    res.json({ ok: true, messageId: data.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/oauth/discord/start', (req, res) => {
  res.json({ message: 'Discord OAuth will be connected here next.' });
});

app.listen(port, () => console.log(`Larix backend running on ${port}`));
