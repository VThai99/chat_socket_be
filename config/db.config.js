module.exports = {
  HOST: "us-cdbr-east-04.cleardb.com",
  USER: "bddaf688c4a62a",
  PASSWORD: "730c2465",
  DB: "heroku_62ef357af56d406",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
