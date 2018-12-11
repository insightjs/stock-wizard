const Sequelize = require('sequelize');
const URI = 'postgres://hckkqjvs:gpvAvyapFgZwAxaYNgKWGu4vN4mpFE7A@pellefant.db.elephantsql.com:5432/hckkqjvs';
const sequelize = new Sequelize(URI);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const Stocks = sequelize.define('stock', {
    // enter schema here:
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    }
  })