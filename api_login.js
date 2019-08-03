var express = require('express');
var router = express.Router();
var jwt = require('./jwt');
var db = require('./db');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 

router.post('/login', function (req, res) {
    const user_name = req.body.user_name;
    const password = req.body.password;

    let sql = "SELECT user_name,password FROM tbl_user WHERE user_name = ?";
    
    db.query(sql,[user_name],function(err, result) {
        if(err) throw err;
       console.log(result.length);
       
        if(result.length > 0) {
            console.log(password);
            console.log(cryptr.decrypt(result[0].password));

            if(password === cryptr.decrypt(result[0].password)) {
                const data = {'user_name': user_name,'password': result[0].password};

                res.json({
                    'status' : 'success',
                    'token' : jwt.sign(data)
                });
            } else {
                res.json({
                    'status' : 'error',
                    'token' : ''
                });
            }
        } else {
            res.json({
                'status' : 'error',
                'token' : ''
            });
        }
    });
});


module.exports = router;