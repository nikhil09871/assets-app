const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ portfolio: "Sample portfolio data" });
});

module.exports = router;
