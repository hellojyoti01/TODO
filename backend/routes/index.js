const express = require("express");
const Router = express.Router();
const { whoAmI } = require("../controllers/authorization.controller");
Router.use("/auth", require("./auth.routes"));
Router.use("/todo", require("./todo.routes"));
Router.get("/who_am_i", whoAmI);

module.exports = Router;
