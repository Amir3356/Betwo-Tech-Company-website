import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/contact', contactRoutes);

  return app;
}

export default createApp;
