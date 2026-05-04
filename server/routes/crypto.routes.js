import express from 'express';
import {
  getCryptos,
  getGainerCryptos,
  getNewCryptos,
  createCrypto
} from '../controllers/crypto.controller.js';

const router = express.Router();

router.get('/', getCryptos);
router.get('/gainers', getGainerCryptos);
router.get('/new', getNewCryptos);
router.post('/', createCrypto);

export default router;
