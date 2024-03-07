const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Route to get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.render('transactions', { transactions });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to create a new transaction
router.post('/', async (req, res) => {
    const { type, description, amount } = req.body;
    const transaction = new Transaction({ type, description, amount });

    try {
        await transaction.save();
        res.redirect('/transactions');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;