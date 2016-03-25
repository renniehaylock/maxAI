var express = require('express');
var router = express.Router();
var passport = require('passport');
var Command = require('../models/command');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/error',
                                   failureFlash: false })
);

router.get('/profile', function(req, res, next) {
  res.render('profile',{
            user : req.user // get the user out of session and pass to template
        });
});

router.get('/error', function(req, res, next) {
  res.render('error');
});

// Commands
router.get('/commands', function(req, res, next) {
  // Find user commands
  var user = req.user;
  Command.find({user: user._id}, function(err,commands) {
    res.render('commands', {user: user, commands: commands});
  });
});

router.get('/command/new', function(req, res, next) {
  res.render('new_command');
});

router.post('/command/new', function(req, res, next) {
  console.log(req);
  Command.create({ query: req.body.query, user: req.user._id, response: req.body.response, channel: null }, function(err, newCommand) {
    res.redirect('/commands');
  });
});

router.get('/api/query',function(req, res) {
  var userId = req.param('userId');
  var queryValue = req.param('query');
  Command.findOne({ user: userId, query: queryValue}, function(err,command) {
    if (err || !command) {
      res.json({ error: "Sorry, I don't know what that means" });
    } else {
      res.json({ answer: command.response });
    };
  });
});

module.exports = router;
