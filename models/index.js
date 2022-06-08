const dbConfig = require("../config/db.config")
const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  db.user = require("./user.model.js")(sequelize, Sequelize);
  db.groupChat = require("./groupChat.model")(sequelize, Sequelize);
  db.memberGroup = require("./memberGroup.model")(sequelize, Sequelize);
  db.message = require("./message.model")(sequelize, Sequelize);
  module.exports = db;