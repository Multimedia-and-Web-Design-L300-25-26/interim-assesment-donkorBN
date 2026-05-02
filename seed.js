import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crypto from './models/Crypto.js';

dotenv.config();

const cryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 64230.50,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    change24h: '+1.2'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3450.20,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    change24h: '+2.5'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 145.80,
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    change24h: '-0.8'
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    change24h: '+5.2'
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.16,
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    change24h: '+12.4'
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await Crypto.deleteMany();
    await Crypto.insertMany(cryptos);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
