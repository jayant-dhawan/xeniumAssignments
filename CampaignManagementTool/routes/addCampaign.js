const express = require('express');
const passport = require('passport');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MONGOURL = require('../db');
const Campaigns = require('../models/campaigns');
var advertiserName = null;

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
        res.redirect('/advertiser/1');
    else
        res.redirect('/');
});

router.post('/:id', isAuthenticated, function (req, res) {
    if (req.isAuthenticated()) {
        for (var i = 0; i < req.body.row.length; i++) {
            var data = new Campaigns(req.body.row[i]);
            data.advertiserId = req.params.id;
            data.advertiserName = advertiserName;
            data.save()
                .then(item => {
                    //console.log(item)
                })
                .catch(err => {
                    console.log(err);
                });
        }
        res.redirect('/:id');
    } else
        res.redirect('/');
});

router.get('/:id', isAuthenticated, function(req, res){
    if(req.isAuthenticated()){
        res.redirect('/addCampaign/'+ req.params.id + '1');
    }
    else
    res.redirect('/');
});

router.get('/:id/:page', isAuthenticated, function (req, res) {
    if (req.isAuthenticated()) {
        advertiserName = req.query.adName;
        var id = req.params.id;
        var perPage = 10
        var page = req.params.page || 1

        //console.log(id)
        Campaigns.find({
                advertiserId: id
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function (err, camp) {
                Campaigns.countDocuments().exec(function (err, count) {
                    if (err) return next(err)
                    res.render('addCampaign', {
                        campaign: camp,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        adId: id
                    })
                })
            })
    } else
        res.redirect('/');
});


module.exports = router;