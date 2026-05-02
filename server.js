import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://coinbase-nana-frontend.netlify.app'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Base route
app.get('/', (req, res) => {
  res.send('Coinbase Clone API is running...');
});

// Routes
import authRoutes from './routes/authRoutes.js';
import cryptoRoutes from './routes/cryptoRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
