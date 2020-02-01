const express = require('express');
var passport = require('passport');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MONGOURL = require('../db');
const Advertisers = require('../models/advertiser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

router.get('/', isAuthenticated, function (req, res) {
    if (req.isAuthenticated())
        res.redirect('/dashboard');
    else
        res.redirect('/');
});

router.post('/addData', isAuthenticated, function (req, res) {
    if (req.isAuthenticated()) {
        var data = new Advertisers(req.body);
        console.log(req.body);
        data.save()
            .then(item => {
                res.redirect("1");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    } else
        res.redirect('/');
});

router.get('/:page', isAuthenticated, function (req, res, next) {
    if (req.isAuthenticated()) {
        var perPage = 10
        var page = req.params.page || 1

        Advertisers.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, advert) {
                Advertisers.countDocuments().exec(function (err, count) {
                    if (err) return next(err)
                    res.render('advertiser', {
                        advertiser: advert,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            })
    } else
        res.redirect('/');
})

module.exports = router;