const express = require('express');
const loggedIn = require('../controllers/loggedIn');
const router = express.Router();

const logout = require('../controllers/logout');

router.get('/', loggedIn, (req, res) => {
  if (req.user) {
    res.render('pages/index', { status: "loggedIn", user: req.user });

  } else {
    res.render('pages/index', { status: "no", user: "nothing" });
  }
});

router.get('/register', (req, res) => {
  if (req.user) {
    res.render('pages/index', { status: "loggedIn", user: req.user });

  } else {
    res.render('pages/register', { status: "no", user: "nothing" });
  }
});

router.get('/login', (req, res) => {
  // res.sendFile('login.html', {root: "./public/"});
  if (req.user) {
    res.render('pages/index', { status: "loggedIn", user: req.user });

  } else {
    res.render('pages/login', { status: "no", user: "nothing" });
  }
});

router.get('/profile', loggedIn, (req, res) => {
  if (req.user) {
    res.render('pages/profile', { status: "loggedIn", user: req.user });
  } else {
    res.redirect('/');
  }
});

router.get('/profile/edit', loggedIn, (req, res) => {
  if (req.user) {
    res.render('pages/editProfile', { status: "loggedIn", user: req.user });
  } else {
    res.redirect('/');
  }
});

router.get('/logout', logout);

module.exports = router;
