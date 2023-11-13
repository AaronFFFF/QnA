
const express = require('express');
const Question = require('../models/questionmd')
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('questions/new', {question: new Question() });
})

router.get('/:slug', async (req, res) => {
  const question = await Question.findOne({slug: req.params.slug});
  if(question == null) res.redirect('/');
  res.render('questions/detail', {question: question});

})

router.post('/', async (req, res)=> {
  let question = new Question({
    title: req.body.title,
    description: req.body.description,
    questioner: req.session.userid,
  })
  try{
    question = await question.save();
    res.redirect(`/questions/${question.slug}`);
  }
  catch(e){
    console.log(e);
    res.render('questions/new', {question: question});
  }  
})

router.delete('/:id', async (req, res) =>{
  await Question.findByIdAndDelete(req.params.id);
  res.redirect('/');
})

module.exports = router;
