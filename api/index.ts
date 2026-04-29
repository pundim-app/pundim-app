import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import path from 'path';

const app = express();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota catch-all para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
