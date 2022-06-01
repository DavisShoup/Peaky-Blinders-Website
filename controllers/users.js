const express = require('express');
const { all } = require('express/lib/application');
const req = require('express/lib/request');
const User = require('../models/user.js');
const seedData = require('../models/seedData.js');
const router = express.Router();
console.log(seedData)


// SEED

router.get('/seed', (req, res) => {
    User.deleteMany({}, (error, allUsers) => {});
    User.create(seedData, (error, data) => {
        res.redirect('/homepage')
    })
});

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

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true,
        },
        (error, updateUser) => {
    res.redirect(`/homepage/${req.params.id}`)
    });
});

//CREATE

router.post('/', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/homepage')
	});
});

//EDIT

router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('./views/edit.ejs', {
            user: foundUser,
        });
    });
});

//SHOW

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('show.ejs', {
            user: foundUser,
        });
    });
});

module.exports = router