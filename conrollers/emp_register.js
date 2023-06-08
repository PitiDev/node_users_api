var express = require('express');
var router = express.Router();
var db = require('./../db');
var moment = require('moment');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const pdf2base64 = require('pdf-to-base64');
 

router.get('/get_emp', function (req, res) {
    let sql = 'SELECT * FROM employee';
    db.query(sql, function(err,result){
        if(err) throw err;    
        res.json(result);
    });
});

router.post('/emp_register', function (req, res) {
    console.log(req.body);
    
    const user_id = req.body.user_id;
    const user_name = req.body.user_name;
    const password = cryptr.encrypt(req.body.password);
    const created_date = moment(new Date).format('YYYY-MM-DD H:m:s');

     
    let data = [[
        user_name,
        password,
        created_date
    ]];

    pdf2base64("test/sample.pdf")
    .then(
        (response) => {
            console.log(response); //cGF0aC90by9maWxlLmpwZw==
        }
    )
    .catch(
        (error) => {
            console.log(error); //Exepection error....
        }
    )
    
    let sql = "INSERT INTO employee (name,password,created_date) VALUES ?";
    db.query(sql,[data],function(err, result) {
        if(err) throw err;
        res.json({
            'status': 'success'
        });
    });
    

});



module.exports = router;