var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about',(req, res) =>{
  res.render('about');
});

module.exports = router;