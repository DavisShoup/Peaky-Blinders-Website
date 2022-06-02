const express = require('express');
const { all } = require('express/lib/application');
const req = require('express/lib/request');
const User = require('../models/user.js');
const seedData = require('../models/seedData.js');
const { redirect } = require('express/lib/response');
const router = express.Router();


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

router.delete("/:id", (req,res) => {
    User.findById(req.params.id, (error, deleteHorse) => {
        res.redirect("/homepage");
    })
})

//UPDATE

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
        },
        (error, updateHorse) => {
    res.redirect(`/homepage/${req.params.id}`)
    });
});

router.patch('/:id', (req, res) => {
    User.findByIdAndUpdate

//CREATE

router.post('/', (req, res) => {
    User.create(req.body, (error, createdUser) => {
        res.redirect('/homepage')
	});
});

//EDIT

router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('edit.ejs', {
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