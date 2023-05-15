const express = require("express");
const Router = express.Router();

const { signIn, signUp } = require("../controllers/aunthection.controller");
const { whoAmI } = require("../controllers/authorization.controller");

Router.post("/sign_up", signUp);
Router.post("/sign_in", signIn);

module.exports = Router;
