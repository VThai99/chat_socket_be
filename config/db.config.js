module.exports = {
  HOST: "chatdatabase.ccjxkf9rovy5.ap-southeast-1.rds.amazonaws.com",
  USER: "hvthai",
  PASSWORD: "1234567Aa",
  DB: "chatDB",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
