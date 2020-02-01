var express = require('express');
var passport = require('passport');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
  }

router.get('/', isAuthenticated, function(req, res){
    if(req.isAuthenticated())
        res.render("dashboard");
    else 
        res.redirect('/');
})

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;