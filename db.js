var mysql = require('mysql');
var connection  = mysql.createPool({
  connectionLimit : 10000,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  port            : 3306,
  database        : 'app_flutter',
});
module.exports = connection;