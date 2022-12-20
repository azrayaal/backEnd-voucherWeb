'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

db.payment = require('./payment.js')(sequelize, DataTypes);
db.coin = require('./coin.js')(sequelize, DataTypes);
db.voucher = require('./voucher.js')(sequelize, DataTypes);
db.transactions = require('./transactions.js')(sequelize, DataTypes);

db.voucher.hasMany(db.coin, {
  foreignKey: 'voucher_id',
  as: 'coins',
});

db.voucher.hasMany(db.payment, {
  foreignKey: 'voucher_id',
  as: 'payment',
});

db.payment.hasMany(db.coin, {
  foreignKey: 'payment_id',
  as: 'coins',
});

db.coin.belongsTo(db.voucher, {
  foreignKey: 'voucher_id',
  as: 'voucher',
});

db.coin.belongsTo(db.payment, {
  foreignKey: 'payment_id',
  as: 'payment',
});

db.payment.belongsTo(db.voucher, {
  foreignKey: 'voucher_id',
  as: 'voucher',
});

module.exports = db;
