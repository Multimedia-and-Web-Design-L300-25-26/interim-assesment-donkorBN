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

// CORS configuration with logging for debugging
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://coinbase-nana-frontend.netlify.app',
  'https://donkorbn-crypto-project.netlify.app',
  'https://donkorbn-crypto-project.netlify.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.netlify.app')) {
      callback(null, true);
    } else {
      console.log('CORS Blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Explicitly handle preflight requests
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

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
