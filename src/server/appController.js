// // const { Stocks } = require('../db/Model');
// const pgPromise = require('pg-promise');
// const pgp = pgPromise({ capSQL: true });
// const db = pgp('postgres://hckkqjvs:gpvAvyapFgZwAxaYNgKWGu4vN4mpFE7A@pellefant.db.elephantsql.com:5432/hckkqjvs');


// const appController = {
//   // getStock(req, res) {
//   //   db.any(`SELECT * FROM "public"."predictions" WHERE symbol='${req.params.symbol.toUpperCase()}' LIMIT 1`, [true])
//   //   .then(data => {
//   //     data.length === 0 ? res.send({dberror: 'no such stock found'}) : res.send(data)
//   //   })
//   //   .catch((err) => console.log('getstockerror', err));

//   // },

//   followStock(req, res) {
    
//   },

//   removeStock(req, res) {
//   },

//   getRankings(req, res) {
//   },

//   submitDraft(req, res) {
//   }
// }

// module.exports = appController;