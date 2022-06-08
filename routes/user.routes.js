const users = require("../controllers/user.controller");
var router = require("express").Router();
router.post("", users.create);
router.get("", users.showAll)
router.get("/:id", users.detail)
router.put("/:id", users.update)
router.post("/login", users.login)
module.exports = router;
