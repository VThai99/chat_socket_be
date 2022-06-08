const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
const Op = db.sequelize.Op;
const create = async (req, res) => {
  hashPass = await bcrypt.hash(req.body.password, 10);
  const user = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashPass,
    avata: req.body.avata ? req.body.avata : null,
    role: req.body.role,
    is_delete: "FALSE",
  };
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.password ||
    !req.body.role
  ) {
    res.status(400).send({ message: "content can not be empty" });
    return;
  }
  User.findOne({ where: { email: req.body.email } }).then((dataExist) => {
    if (dataExist) {
      res.status(400).send({
        message: "email have been registed",
      });
      return;
    } else {
      User.create(user)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "something wrong",
          });
        });
    }
  });
};

const showAll = (req, res) => {
  User.findAll()
    .then((data) => {
      {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "something wrong",
      });
    });
};

const detail = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      data
        ? res.status(200).send(data)
        : res.status(400).send({ message: `can't find user with id = ${id}` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "something wrong",
      });
    });
};
const update = async (req, res) => {
  const id = req.params.id;
 await User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(202).send({ message: "update success" });
      } else {
        res.status(400).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "something wrong",
      });
    });
  const users = await User.findAll()
  socketIo.emit('user_update', users)
};
const login = (req, res) => {
  User.findOne({ where: { email: req.body.email } }).then((response) =>
    bcrypt.compare(req.body.password, response.password, (err, isCompare) => {
      if (!isCompare) {
        res.status(400).send({ message: "Email or Password does not match" });
      } else {
        const theToken = jwt.sign(
          {
            id: response.id,
            name: response.name,
            email: response.email,
            phone: response.phone,
            role: response.role,
          },
          "THE SUPPER GOD KEY"
        );
        res.status(200).send({
          token: theToken,
        });
      }
    })
  );
};
module.exports = {
  create,
  showAll,
  detail,
  update,
  login,
};
