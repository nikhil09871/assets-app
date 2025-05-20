const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { symbol, action } = req.body;
    // Execute trade logic here
    console.log(`Executing ${action} on ${symbol}`);
    res.json({ message: `Trade executed: ${action} on ${symbol}` });
});

module.exports = router;