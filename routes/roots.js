const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send('hello word').json({message: 'Hello word!'})
})

module.exports = router