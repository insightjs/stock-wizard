const Stocks = require('./StockModel');

const appController = {
  getStock(req, res) {
    //find the right stock table in database
    Stocks.findAll()
    .then(response => {
      res.send(response)
    })
    .catch((error) => console.log(error))
  }
}

module.exports = appController;