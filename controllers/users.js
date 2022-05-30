const express = require('express');
const { all } = require('express/lib/application');
const User = require('../models/user.js')
const router = express.Router();

//INDEX
router.get('/', (req, res) => {
    User.find({}, (error, allUsers) => {
        res.render('index.ejs', {
            users: allUsers,
        });
    }); 
});