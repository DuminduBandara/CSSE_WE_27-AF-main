import { Router } from 'express';
import Transaction from '../models/Transaction.js';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, packageId } = req.body;

  try {
    const item = new Transaction();
    item.userId = userId;
    item.packageId = packageId;

    await item.save();

    res.json({ msg: 'Transaction added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId/:packageId', async (req, res) => {
  try {
    const { userId, packageId } = req.params;

    const transaction = await Transaction.findOne({ userId, packageId });

    if (transaction) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
