const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const appController = require ('./appController');

const app = express();
// app.use(express.static(path.join(__dirname, './../')))

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(8080, () => console.log('Listening on port 8080'));

app.get('/', (req, res,) => {
  res.header(200).sendFile('index.html')
})

app.get('/stock/:id', (req, res,) => {
  appController.getStock(req, res)
})