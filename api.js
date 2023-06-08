var express = require('express');
var router = express.Router();


const userAPI = require('./api_user');
const customerAPI = require('./api_customer');
const logAPI = require('./api_login');
const emp_regis = require('./conrollers/emp_register')

router.use(userAPI);
router.use(customerAPI);
router.use(logAPI);
router.use(emp_regis);

module.exports = router;