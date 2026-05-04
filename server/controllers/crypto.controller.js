import Crypto from '../models/Crypto.js';

// @desc    Fetch all cryptos
// @route   GET /api/crypto
// @access  Public
const getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch top gainers
// @route   GET /api/crypto/gainers
// @access  Public
const getGainerCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    
    // Sort by 24h change (descending)
    // We need to parse the percentage string (e.g. "+2.5" -> 2.5)
    const sorted = cryptos.sort((a, b) => {
      const changeA = parseFloat(a.change24h.replace('+', ''));
      const changeB = parseFloat(b.change24h.replace('+', ''));
      return changeB - changeA;
    });

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch new listings
// @route   GET /api/crypto/new
// @access  Public
const getNewCryptos = async (req, res) => {
  try {
    // Sort by createdAt (descending)
    const cryptos = await Crypto.find({}).sort({ createdAt: -1 });
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new crypto
// @route   POST /api/crypto
// @access  Public (Should be protected in production, but for assessment keeping it simple)
const createCrypto = async (req, res) => {
  const { name, symbol, price, image, change24h } = req.body;

  try {
    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h
    });

    if (crypto) {
      res.status(201).json(crypto);
    } else {
      res.status(400).json({ message: 'Invalid crypto data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getCryptos,
  getGainerCryptos,
  getNewCryptos,
  createCrypto
};
