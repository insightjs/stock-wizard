var util = require('util');
var simpleTimer = require('node-timers/simple');


var yahooFinance = require('yahoo-finance');

let symbol = '';
let idCounter = 25;

const pgPromise = require('pg-promise');
var simple = simpleTimer({pollInterval: 100});
const connStr = 'postgres://hckkqjvs:gpvAvyapFgZwAxaYNgKWGu4vN4mpFE7A@pellefant.db.elephantsql.com:5432/hckkqjvs';

const pgp = pgPromise({
  capSQL: true // generating capitalized sql
}); 

const db = pgp(connStr);

const cs = new pgp.helpers.ColumnSet([
  'symbol', 
  'volume',
  {name: 'adjclose', prop: 'adjClose'},
  'open',
  'high',
  'close',
  'low',
  'date'
],  {table: {table: 'stockhist', schema: 'schemastock'}});

let dataArr = [];
// Example tickers sampled from S & P 500
let symbolsList = ["FLT","FLIR","FLS","FLR","FMC","FL"];
let fromDate = ``;
let toDate = ``
let masterArr = [];


for (let j = 0; j < symbolsList.length; j++) {
  dataArr.push(new Promise((resolve, reject) => {
    yahooFinance.historical({
      symbol: symbolsList[j],
      from: '2013-01-01',
      to: '2018-12-12',
      period: 'd'
    }, function (err, quotes) {
      if (err) { throw err; }
      console.log(util.format(
        '=== %s (%d) ===',
        symbolsList[j],
        quotes.length
        ));
        // dataArr.push(quotes);
        setTimeout(() => {
          console.log("Waiting period...");
          resolve(quotes);
        }, 1000)
    })
  }));

}

//Starts keeping track of passed time...
simple.start();

//returns the time that has passed in milliseconds
Promise.all(dataArr)
  .then((dataArr) => {
    return dataArr.flat();
 
  }).then((dataArr) => {
    insert = pgp.helpers.insert(dataArr, cs);
    return insert;
  }).then((insert) => {
    db.none(insert)
    .then(() => {
      console.log("All records inserted");
    })
    .catch(error => {
      console.log(error);
        // error
    });
  });
`INSERT INTO schemastock.stockresults (id, symbol, date, close, svgdata) VALUES
(nextval('stock_sequence'), 'AAPL', '2012-12-31T05:00:00.000Z', 34.6398, [Datapoints, datapoints2]);
 `

