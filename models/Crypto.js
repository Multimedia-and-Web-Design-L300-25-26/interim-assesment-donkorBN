import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true
  },
  symbol: {
    type: String,
    required: [true, 'Please add a symbol'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  change24h: {
    type: String,
    required: [true, 'Please add 24h change (e.g. +2.5)']
  }
}, {
  timestamps: true
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

export default Crypto;
