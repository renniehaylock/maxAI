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
  Command.create({ query: req.body.query.toLowerCase();, user: req.user._id, response: req.body.response, channel: null }, function(err, newCommand) {
    res.redirect('/commands');
  });
});

router.get('/api/query',function(req, res) {
  var userId = req.param('userId');
  var queryValue = req.param('query').toLowerCase();;
  Command.findOne({ user: userId, query: queryValue}, function(err,command) {
    if (err || !command) {
      res.json({ answer: "Sorry, I don't know what that means" });
    } else {
      
      // TODO: Here we would normally take this command,
      // check what action it belongs to...
      // using the action and the proper channel make a call 
      // to the proper channel endpoint... use that response
      // to send back answer to raspi
      // 
      // Problem:
      // Jasper doesn't always get the perfect STT...
      // So here we could traverse over all commands, calculating
      // String metric to find what comman is closest to what the
      // User needs...
      //  
      res.json({ answer: command.response });
    };
  });
});

module.exports = router;
