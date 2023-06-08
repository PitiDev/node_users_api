var mysql = require('mysql');
var connection  = mysql.createPool({
  connectionLimit : 10000,
  host            : 'sql351.main-hosting.eu',
  user            : 'u295847955_infrasole_hr',
  password        : 'P@r97778968',
  port            : 3306,
  database        : 'u295847955_infrasole_hr',
});
module.exports = connection;