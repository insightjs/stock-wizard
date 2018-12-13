const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appController = require ('./appController');
const authController = require('./authController');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(8080, () => console.log('Listening on port 8080'));

app.post('/api/register', authController.register)
app.post('/api/signin', authController.authenticate)

app.get('/api/stock/:symbol', authController.checkCookie, appController.getStock)

//add stock to dashboard-favorite
// app.post('/api/myStocks', appController.followStock)
// app.delete('/api/myStocks', appController.removeStock)
//compete with friends
// app.get('/api/rankings', appController.getRankings)
// app.post('/api/prophesy', appController.submitDraft)

// app.use(express.static('../../'))