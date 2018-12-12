//expire a connection after an hour each 20min
let connections = {};
setInterval(() => {
  for (key in connections) {
    if (Date.now() > (connections[key][loginTime] + 3600000)) delete connections[key];
  }
}, 1200000)

module.exports = {
  register (req, res, next) {
    //TODO: create username&password in db (public/login table)
  },
  authenticate (req, res, next) {
    //TODO: refactor to lookup from db
    if (req.body.username === 'thewizard' && req.body.password === 'opensesame') {
      
      let cookieID = (Math.random()*1000000000)
      res.cookie('token', 'somesecretkey');
      res.cookie('cookieID', cookieID);
    
      connections[req.body.username] = {
        cookieID: cookieID,
        loginTime: Date.now()
      }

      next();
    } else {
      res.header(401).send('unsuccessful login')
    }
  },
  checkCookie (req, res, next) {
    //TODO: remove one of these
    (req.cookies.token === 'somesecretkey') ? next() : res.header(403).send('Please sign in');

    for (key in connections) {
      (req.cookies.cookieID === obj[key][cookieID]) ? next() : res.header(403).send('Please sign in again');
    }
  }
}