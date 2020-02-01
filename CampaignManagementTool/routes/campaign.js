var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const MONGOURL = require('../db');
const Campaign = require('../models/campaigns');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

router.get('/', isAuthenticated, function (req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/campaign/filter');
    else res.redirect('/');
});

router.get('/filter', isAuthenticated, function (req, res) {
    if (req.isAuthenticated()) {
        Campaign.find({}, function (err, data) {
            if (err) res.send(err);
            else {
                res.render('filter', {
                    campaignData: data
                });
            }
        })
    } else res.redirect('/');
});

router.post('/filter', function (req, res) {
    if (req.isAuthenticated()) {
        let request = {};

        //console.log(req.body)
        if (req.body.advertiser != "null" && req.body.advertiserName != undefined)
            request.advertiserName = req.body.advertiserName;
        if (req.body.campaign != "null" && req.body.campaign != undefined)
            request.campaignName = req.body.campaign;
        if (req.body.mode != "null" && req.body.mode != undefined)
            request.descriptionMode = req.body.mode;
        if (req.body.geo != "null" && req.body.geo != undefined)
            request.geo = req.body.geo;
        if (req.body.vertical != "null" && req.body.vertical != undefined)
            request.vertical = req.body.vertical;
        console.log(request)
        Campaign.find(request, function (err, campaignData) {
            if (err) res.send(err);
            else
                res.send(campaignData)
        });
    } else res.redirect('/');
    //res.send(request);

});
module.exports = router;