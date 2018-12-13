const { Users } = require('../db/Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//expire a connection after an hour (runs each 20min)
let connections = {};
setInterval(() => {
  for (key in connections) {
    if (Date.now() > (connections[key]['loginTime'] + 3600000)) delete connections[key];
  }
}, 1200000)

module.exports = {
  register (req, res, next) {
    Users.findOne({ where: { username: req.body.username } })
    .then(response => {      
      if (response === null) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {console.log(err); throw err;}
            Users.create({ 
              username: req.body.username, 
              password: hash
            }).then(user => {
              console.log('successfully created:', req.body.username)
              next();
            })
          });
        });
      } else {
        res.status(400).send({msg: 'User already exists'})
      }
    })
  },
  authenticate (req, res, next) {
    Users.findOne({ where: { username: req.body.username } })
    .then(response => {
      if (response === null) {
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