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

router.get('/:id/new', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('new.ejs', {
            user: foundUser,
        });
    });
});

//DELETE

router.delete("/:id/:horseID", (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        foundUser.horse.id(req.params.horseID).remove()
        foundUser.save()
    });
    res.redirect(`/homepage`)
});

//UPDATE

router.patch('/:id/:horseID', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
    foundUser.horse.id(req.params.horseID).horseImg = req.body.horseImg
    foundUser.horse.id(req.params.horseID).horseName = req.body.horseName
    foundUser.horse.id(req.params.horseID).breed = req.body.breed
    foundUser.horse.id(req.params.horseID).height = req.body.height
    foundUser.horse.id(req.params.horseID).color = req.body.color
    foundUser.horse.id(req.params.horseID).number = req.body.number
    foundUser.horse.id(req.params.horseID).horseShoe = req.body.horseShoe
    foundUser.horse.id(req.params.horseID).jockeyName = req.body.jockeyName
    foundUser.save()
    res.redirect('/homepage')
    });
});

//CREATE

router.post('/:id', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        foundUser.horse.push(req.body);
        foundUser.save();
	});
    res.redirect('/homepage')
});

//EDIT

router.get('/:id/:horseID/edit', (req, res) => {
    User.findById(req.params.id, (error, foundUser) => {
        res.render('edit.ejs', {
            user: foundUser,
            horseID: req.params.horseID,
            horseImg: foundUser.horse.id(req.params.horseID).horseImg,
            horseName: foundUser.horse.id(req.params.horseID).horseName,
            breed: foundUser.horse.id(req.params.horseID).breed,
            height: foundUser.horse.id(req.params.horseID).height,
            color: foundUser.horse.id(req.params.horseID).color,
            number: foundUser.horse.id(req.params.horseID).number,
            horseShoe: foundUser.horse.id(req.params.horseID).horseShoe,
            jockeyName: foundUser.horse.id(req.params.horseID).jockeyName,
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