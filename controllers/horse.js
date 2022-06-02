const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX
router.get('/', (req, res) => {
    User.find({}, (error, allHorse) => {
        res.render('index.ejs', {
            horse: allHorse,
        });
    });
});

module.exports = router
