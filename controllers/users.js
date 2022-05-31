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

//NEW

//DELETE

//UPDATE

//CREATE

//EDIT

//SHOW

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('show.ejs', {
            user: foundUser
        });
    });
});

module.exports = router