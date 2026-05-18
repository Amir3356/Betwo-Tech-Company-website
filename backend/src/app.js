import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';
import { checkDatabaseConnection } from './config/db.js';

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/health/db', async (_req, res) => {
    try {
      const connected = await checkDatabaseConnection();
      res.json({ ok: connected, status: connected ? 'connected' : 'disconnected' });
    } catch (error) {
      res.status(503).json({ ok: false, status: 'disconnected', message: error.message });
    }
  });

  app.use('/api/contact', contactRoutes);

  return app;
}

export default createApp;
