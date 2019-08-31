const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

const accountController = require("../controllers/account");

router.put("/register", accountController.register);

router.post("/login", accountController.login);

module.exports = router;
