//Imports
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Question = require('./models/questionmd');
const connectdb = require('./server/db');
const questionRouter = require('./routes/question');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('./models/usermd');
const port = 8000 || process.env.port;
const app = express();

connectdb();

//Static file
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

//Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

//key
const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');

app.use(cookieParser());
app.use(
  session({
    secret: secretKey, 
    resave: true,
    saveUninitialized: true,
    rolling: true,
  })
);

app.get('/', async (req, res) => {
  try {
    if (req.session.userid) {
      let filter = {};
      const searchQuery = req.query.searchQuery;

      if (searchQuery) {
        filter = {
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
            { questioner: { $regex: searchQuery, $options: 'i' } }
          ]
        };
      }

      const questions = await Question.find(filter).sort({ createdAt: 'desc' });
      res.render('questions/index', { questions, searchQuery });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.render('error'); // Display an error page if an error occurs
  }
});

/*app.get('/', async (req, res) => {
  if (req.session.userid) {
    const questions = await Question.find().sort({ createdAt: 'desc' });
    res.render('questions/index', { question: questions });
  } else {
    res.redirect('/login'); 
  }
});*/

/*app.get('/', async (req, res) => {
    const question = await Question.find().sort({createdAt: 'desc'});
    res.render('questions/index', { question: question});
});*/


//Listen in prot 
app.use('/login', require('./routes/login'));
app.use('/', require('./routes/login'));
app.use('/questions', questionRouter);
app.listen(port, () => console.info(`Server started on port ${port}`));
