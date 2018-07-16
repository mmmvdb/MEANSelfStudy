var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //throw new Error("BROKEN"); // Express will catch this on its own.
  res.render('index', { title: 'Hey' , message: 'Hello there!'});
});

module.exports = router;
