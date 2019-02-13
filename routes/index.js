const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Malerie Fleischman' });
});

router.get('/timer', function(req, res, next){
  res.render('timer', { title: 'React Timer'});
});

module.exports = router;
