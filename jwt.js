const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
var publicKEY = fs.readFileSync(path.join(__dirname + '/key/public.key'), 'utf8');
var privateKEY = fs.readFileSync(path.join(__dirname + '/key/private.key'), 'utf8');


var i = 'Laogw Ltd'; // Issuer (Software organization who issues the token)
var s = 'keooudone.n@laogw.la'; // Subject (intended user of the token)
var a = 'http://laogw.la'; // Audience (Domain within which this token will live and function)


module.exports = {
  sign: (payload) => {
    // Token signing options
    var signOptions = {
      issuer: i,
      subject: s,
      audience: a,
      expiresIn: "24h", // 24h validity
      algorithm: "RS256"
    };
    return jwt.sign(payload, privateKEY, signOptions);
  },
  verify : (req, res, next) => {
    var token = req.headers['x-access-token'];
        if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

        var verifyOptions = {
            issuer: 	i,
            subject: 	s,
            audience: 	a,
            expiresIn: 	"24h",
            algorithm: 	["RS256"]
        };      

        jwt.verify(token, publicKEY, verifyOptions, function(err, decoded) {
            if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            // if everything good, save to request for use in other routes
            req.userId = decoded.id;
            req.userLevel = decoded.level;
            next();
        });
  },
}
