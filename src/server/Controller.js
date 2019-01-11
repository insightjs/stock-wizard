const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pgPromise = require('pg-promise');
const pgp = pgPromise({ capSQL: true });
const db = pgp('postgres://hckkqjvs:gpvAvyapFgZwAxaYNgKWGu4vN4mpFE7A@pellefant.db.elephantsql.com:5432/hckkqjvs');

// dbClient.query('SELECT * from attractions', function (err, result) {
//   if (err) console.log(err);
//   res.json(result.rows);
// })

//expire a connection after an hour (runs each 20min)
let connections = {};
setInterval(() => {
  for (key in connections) {
    if (Date.now() > (connections[key]['loginTime'] + 3600000)) delete connections[key];
  }
}, 1200000)

module.exports = {
  getStock(req, res) {
    db.any(`SELECT * FROM "public"."predictions" WHERE symbol='${req.params.symbol.toUpperCase()}' LIMIT 1`, [true])
    .then(data => {
      data.length === 0 ? res.send({dberror: 'no such stock found'}) : res.send(data)
    })
    .catch((err) => console.log('getstockerror', err));

  },
  register (req, res, next) {
    // Users.findOne({ where: { username: req.body.username } })
    db.any(`SELECT * FROM "public"."users" WHERE username='${req.body.username}' LIMIT 1`, [true])
    .then(response => { 
      console.log('DB RESPONSE', response)
      if (response.length===0) {
        console.log('creating user')
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {console.log(err); throw err;}
            db.any(`INSERT INTO "public"."users" VALUES (DEFAULT, ${req.body.username}, ${hash}, DEFAULT)`, [true])
            next();
          });
        });
      } else {
        res.status(400).send({msg: 'User already exists'})
      }
    })
  },
  authenticate (req, res, next) {
    db.any(`SELECT * FROM "public"."users" WHERE username='${req.body.username}' LIMIT 1`, [true])
    .then(response => {
      console.log('DB RESPONSE', response)
      if (response.length === 0) {
        console.log('no such user');
        res.header(400).send({msg: 'Invalid credentials'});
      } else {
        bcrypt.compare(req.body.password, response['password']).then((resp) => {
          if (resp === true) {
            console.log('authenticated');
            next();
          } else {
            console.log('wrong username/password')
            res.header(400).send({msg: 'Invalid credentials'})
          }
        });
      }
    })
  },
  addCookieJWT (req, res) {
    //add cookie and store in connections object
    let swCookieID = Math.floor((Math.random()*1000000000));
    res.cookie('swCookieID', swCookieID);
    connections[req.body.username] = {
      swCookieID: swCookieID,
      loginTime: Date.now()
    }

    // //add JWT
    // let token = jwt.sign({
    //   auth:  'magical-stock-wizard',
    //   agent: req.headers['user-agent'],
    //   exp:   (Date.now() + 7*24*3600000) // expires in one week
    // }, secret);  // secret is defined in the environment variable JWT_SECRET
    // // return token;

    console.log('connections obj', connections)
    res.header(200).send({msg: 'Login success'})
  },
  checkCookieJWT (req, res, next) {
    // //validate JWT supplied in request header
    // console.log('req.headers', req.headers)
    // let token = req.headers.authorization;
    // try {
    //   var decoded = jwt.verify(token, secret);
    // } catch (e) {
    //   return authFail(res);
    // }
    // if(!decoded || decoded.auth !== 'magical-stock-wizard') {
    //   console.log('JWT auth failed');// return authFail(res);
    // } else {
    //   console.log('JWT PASSED');// return privado(res, token);
    // }

    //check that session isn't expired from connections object
    for (key in connections) {
      if (parseInt(req.cookies.swCookieID) === parseInt(connections[key]['swCookieID'])) {
        console.log('cookie/session is valid'); 
        next();
      } else {
        //TODO: in front end, redirect user to sign in again
        console.log('cookie/session expired'); 
        res.header(403).send({msg: 'Please sign in again'});
      }
    }
  },
  logout (req, res) {
    //invalidate JWT and delete from connections object; delete cookie?
    //tell front end to toggle loggedinstate
  }
}