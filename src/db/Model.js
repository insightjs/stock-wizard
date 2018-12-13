const Sequelize = require('sequelize');
const URI = 'postgres://wldroypb:01Vp2FpkDPYEADTqIuGdado5rlUPBiB8@baasu.db.elephantsql.com:5432/wldroypb';
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
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true
    },
    symbol: {
      type: Sequelize.STRING
    },
    estimate: {
      type: Sequelize.STRING
    },
    updated_at: {
      type: Sequelize.DATE
    }
  }, {
    timestamps: false
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
  module.exports = {
    Users: Users,
    Stocks: Stocks
  } 