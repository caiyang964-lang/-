import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import Database from 'better-sqlite3';

const PORT = 3000;
const app = express();
app.use(express.json());

// Initialize SQLite database
const db = new Database('portfolio.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS works (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL, -- 'ai_drama' or 'photography'
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    coverImage TEXT NOT NULL,
    mediaUrl TEXT,
    script TEXT,
    assets TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Mock Data Seeding
const existingWorksCount = db.prepare('SELECT COUNT(*) as count FROM works').get() as { count: number };
if (existingWorksCount.count === 0) {
  const insertMock = db.prepare(`
    INSERT INTO works (type, title, description, coverImage, mediaUrl, script, assets)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  // AI Drama 1
  insertMock.run(
    'ai_drama',
    'Neon Echoes',
    'A cyberpunk narrative exploring the meaning of consciousness in an AI-driven society. Visuals generated with Midjourney V6, animation via Runway Gen-2.',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    JSON.stringify(['https://www.w3schools.com/html/mov_bbb.mp4']),
    'SCENE START\nINT. SERVER ROOM - NIGHT\nNeon lights bleed through the cracks...',
    JSON.stringify(['Concept Art 1', 'Character Turnaround', 'VFX Layers'])
  );

  // Photography 1
  insertMock.run(
    'photography',
    'Silence in the Alps',
    'A harsh yet beautiful exploration of the Italian Alps during deep winter.',
    'https://images.unsplash.com/photo-1621570074981-ee6a0145c8b5?q=80&w=1600&auto=format&fit=crop',
    JSON.stringify([]),
    '',
    JSON.stringify(['High-res printable version', 'Raw file snippet'])
  );
  
  // AI Drama 2
  insertMock.run(
    'ai_drama',
    'The Final Symphony',
    'An orbital station prepares for the end of the universe while listening to Beethoven.',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    JSON.stringify(['https://www.w3schools.com/html/mov_bbb.mp4']),
    'SCENE START\nEXT. ORBIT - CONTINUOUS\nStars dying gracefully...',
    JSON.stringify(['Storyboards', 'Audio Stems'])
  );

    // Photography 2
  insertMock.run(
    'photography',
    'Urban Shadows',
    'Street photography capturing the high-contrast lives of Tokyo denizens.',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop',
    JSON.stringify([]),
    '',
    JSON.stringify(['B&W Print version'])
  );
}

// API Routes
app.get('/api/works', (req, res) => {
  const { type } = req.query;
  let query = 'SELECT * FROM works ORDER BY createdAt DESC';
  let params: any[] = [];
  if (type) {
    query = 'SELECT * FROM works WHERE type = ? ORDER BY createdAt DESC';
    params.push(type);
  }
  const works = db.prepare(query).all(params);
  // Parse JSON fields
  const parsedWorks = works.map((w: any) => ({
    ...w,
    mediaUrl: w.mediaUrl ? JSON.parse(w.mediaUrl) : [],
    assets: w.assets ? JSON.parse(w.assets) : []
  }));
  res.json(parsedWorks);
});

app.get('/api/works/:id', (req, res) => {
  const work = db.prepare('SELECT * FROM works WHERE id = ?').get(req.params.id) as any;
  if (!work) return res.status(404).json({ error: 'Not found' });
  res.json({
    ...work,
    mediaUrl: work.mediaUrl ? JSON.parse(work.mediaUrl) : [],
    assets: work.assets ? JSON.parse(work.assets) : []
  });
});

app.post('/api/works', (req, res) => {
  const { type, title, description, coverImage, mediaUrl, script, assets } = req.body;
  const stmt = db.prepare(`
    INSERT INTO works (type, title, description, coverImage, mediaUrl, script, assets)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    type,
    title,
    description,
    coverImage,
    JSON.stringify(mediaUrl || []),
    script || null,
    JSON.stringify(assets || [])
  );
  
  res.status(201).json({ id: result.lastInsertRowid });
});

app.delete('/api/works/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM works WHERE id = ?');
  const result = stmt.run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
