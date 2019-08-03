var express = require('express');
var router = express.Router();


const userAPI = require('./api_user');
const customerAPI = require('./api_customer');
const logAPI = require('./api_login');

router.use(userAPI);
router.use(customerAPI);
router.use(logAPI);

module.exports = router;