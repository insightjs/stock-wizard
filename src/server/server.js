const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appController = require ('./appController');
const authController = require('./authController');

const app = express();
// app.use(express.static(path.join(__dirname, './../')))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(8080, () => console.log('Listening on port 8080'));

// app.get('/test', (req, res,) => res.header(200).sendFile('index.html'))
app.get('/test', (req, res,) => res.json({msg: 'Routes are working'}))

//TODO: if it's the last middleware, res.header(200) and res.json or res.end()
app.post('/register', authController.register)
app.post('/signin', authController.authenticate)

//get stock data
app.get('/stock/:symbol', authController.checkCookie, appController.getStock)

//add stock to dashboard-favorite
app.post('/myStocks', appController.followStock)
app.delete('/myStocks', appController.removeStock)
//compete with friends
app.get('/rankings', appController.getRankings)
app.post('/prophesy', appController.submitDraft)

app.use(express.static('../../'))