var express = require('express');
var passport = require('passport');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Job Hunt' });
});

router.get('/search',isLoggedIn, function(req, res, next) {
  res.render('search', { title: 'Job Hunt' });
});

router.get('/searching', function(req, res){

 // input value from search
 var val = req.query.search;
//console.log(val);

// url used to search yql
var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
"%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
"json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
console.log(url);

 // request module is used to process the yql url and return the results in JSON format
 request(url, function(err, resp, body) {
   body = JSON.parse(body);
   // logic used to compare search results with the input from user
   if (!body.query.results.RDF.item) {
     craig = "No results found. Try again.";
   } else {
    craig = body.query.results.RDF.item[0]['about'];
   }
 });

  // pass back the results to client side
  res.send(craig);

  // testing the route
  // res.send("WHEEE");

});


// Google routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/search',
  failureRedirect: '/',
}));


/* GET users logout  listing. */
router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();
  res.redirect('/')
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
