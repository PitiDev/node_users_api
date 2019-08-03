var express = require('express');
var router = express.Router();
var jwt = require('./jwt');
var db = require('./db');
var moment = require('moment');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 

router.get('/user/get_user/', function (req, res) {
    let sql = 'SELECT * FROM tbl_user';
    db.query(sql, function(err,result){
        if(err) throw err;    
        res.json(result);
    });
});

router.post('/user/save_user', jwt.verify, function (req, res) {
    console.log(req.body);
    
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const password = cryptr.encrypt(req.body.password);
    const created_date = moment(new Date).format('YYYY-MM-DD H:m:s');

    if(!user_id) {
        let sql = "INSERT INTO tbl_user (user_name,password,created_date) VALUES ?";
    let data = [[
        user_name,
        password,
        created_date
    ]];

    db.query(sql,[data],function(err, result) {
        if(err) throw err;
        res.json({
            'status': 'success'
        });
    });
    }else {
        let sql = "UPDATE tbl_user SET ? WHERE user_id = ?";
        let data = {
            'user_name': user_name,
            'password': password
        }
    
        db.query(sql,[data, user_id],function(err, result) {
            if(err) throw err;
            res.json({
                'status': 'success'
            });
        });
    }

});

router.get('/user/get_user_edit/:id', jwt.verify, function (req, res) {
    let id = req.params.id;
    let sql = 'SELECT * FROM tbl_user WHERE user_id = ?';
    db.query(sql,[id], function(err,result){
        if(err) throw err;    
        res.json({
            'user_id': result[0].user_id,
            'user_name': result[0].user_name,
            'password': cryptr.decrypt(result[0].password),
        });
    });
});

router.post('/user/delete_user', jwt.verify, function (req, res) {
    let id = req.body.user_id;
    let sql = 'DELETE  FROM tbl_user WHERE user_id = ?';
    db.query(sql,[id], function(err,result){
        if(err) throw err;    
        res.json({
            'status': 'success'
        });
    });
});



module.exports = router;