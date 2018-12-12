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
    symbol: {
      type: Sequelize.STRING
    }
  })

  const Users = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    created_at: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false
  });
  module.exports = Users;