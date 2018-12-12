const Stocks = require('../db/StockModel');

const appController = {
  getStock = (req, res) => {
    Stocks.findOne({ where: {symbol: req.params.symbol} })
    // .findAll()
    .then(response => {
      res.send(response)
    })
    .catch((error) => console.log(error))
  },

  followStock = (req, res) => {
  },

  removeStock = (req, res) => {
  },

  getRankings = (req, res) => {
  },

  submitDraft = (req, res) => {
  }
}

module.exports = appController;