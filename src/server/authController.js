const { Users } = require('../db/Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//expire a connection after an hour (runs each 20min)
let connections = {};
setInterval(() => {
  for (key in connections) {
    if (Date.now() > (connections[key][loginTime] + 3600000)) delete connections[key];
  }
}, 1200000)

module.exports = {
  register (req, res) {
    //TODO: create username&password in db (public/login table)
  },
  authenticate (req, res) {
    
    if (req.body.password === 'password') {

      let cookieID = Math.floor((Math.random()*1000000000))
      res.cookie('cookieID', cookieID);
    
      connections[req.body.username] = {
        cookieID: cookieID,
        loginTime: Date.now()
      }
      console.log('connections obj', connections)
      res.header(200).send({msg: 'login success'})
      // next();
    } else {
      console.log('wrong username/password:', req.body.username, req.body.password)
      res.header(401).send({msg: 'unsuccessful login'})
    }
  },
  checkCookie (req, res, next) {
    for (key in connections) {
      (parseInt(req.cookies.cookieID) === parseInt(connections[key]['cookieID'])) 
      ? next() : res.header(403).send('Please sign in again');
    }
  }
}