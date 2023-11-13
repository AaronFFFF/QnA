const express = require('express');
const router = express.Router();
const User = require('../models/usermd');

router.get('/', (req, res) => {
  res.render('login', { error: null });
});

router.post('/', async (req, res) => {
  const { userid, password } = req.body;

  try {
    const user = await User.findOne({ userid, password });
    if (user) {
      req.session.userid = user.userid;
      res.redirect('/');
    } else {
      res.render('login', { error: 'Invalid userid or password'});
    }
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'An error occurred'}); 
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
