const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Controller = require ('./Controller');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(8080, () => console.log('Listening on port 8080'));
  
app.post('/api/register', Controller.register, Controller.addCookieJWT)
app.post('/api/signin', Controller.authenticate, Controller.addCookieJWT)
app.post('/api/logout', Controller.logout)

// Controller.checkCookieJWT,
app.get('/api/stock/:symbol', Controller.getStock)

// //add stock to dashboard-favorites
// app.post('/api/myStocks', Controller.followStock)
// app.delete('/api/myStocks', Controller.removeStock)
// //compete with friends
// app.get('/api/rankings', Controller.getRankings)
// app.post('/api/prophesy', Controller.submitDraft)

// app.use(express.static('../../'))