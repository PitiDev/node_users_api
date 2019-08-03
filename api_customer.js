var express = require('express');
var router = express.Router();

router.get('/customer/get_customer/', function (req, res) {
    res.send('Hello' + req.body.lastname);
});

router.post('/customer/save_customer', function (req, res) {
  
});

module.exports = router;