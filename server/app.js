import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import authRoutes from './routes/auth.routes.js';
import cryptoRoutes from './routes/crypto.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Permissive CORS for the specific Netlify frontend
app.use(cors({
  origin: 'https://donkorbn-crypto-project.netlify.app',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running', timestamp: new Date() });
});

// Base route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
      <h1>Interim Assessment — Backend API</h1>
      <p><strong>Student Name:</strong> Asiamah Emmanuel Donkor</p>
      <p style="color: green; font-weight: bold;">API Status: Running</p>
      
      <hr />
      
      <p>This service implements the backend for a cryptocurrency wallet and exchange demo used in the Multimedia and Web Design L300 assessment.</p>
      <p><em>Note: This is a school project and the data provided is for demonstration purposes only.</em></p>
      
      <h3>Useful Endpoints:</h3>
      <ul>
        <li><strong>Auth:</strong> <code>/api/auth/register</code>, <code>/api/auth/login</code></li>
        <li><strong>Crypto:</strong> <code>/api/crypto</code>, <code>/api/crypto/gainers</code>, <code>/api/crypto/new</code></li>
      </ul>
      
      <p>To use this API, ensure you set the <code>VITE_API_URL</code> in your frontend to point here.</p>
    </div>
  `);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);


export default app;
