const { Stocks } = require('../db/Model');

const appController = {
  getStock(req, res) {
    Stocks.findOne({ where: {symbol: req.params.symbol} })
    .then(response => {
      response === null ? res.send({dberror: 'no such stock found'}) : res.send(response)
    })
    .catch((error) => console.log('getStockError', error))
  },

  followStock(req, res) {
    
  },

  removeStock(req, res) {
  },

  getRankings(req, res) {
  },

  submitDraft(req, res) {
  }
}

module.exports = appController;