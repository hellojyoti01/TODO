const express = require("express");
const Router = express.Router();

const {
	addTodo,
	modifayTodo,
	deleteTodo,
	findTodo,
	getAllTodo,
	deleteAll,
} = require("../controllers/todo.controller");
const { whoAmI, verify } = require("../controllers/authorization.controller");
Router.route("/get").get(verify, getAllTodo);
Router.route("/add").post(verify, addTodo);

Router.route("/:id").put(modifayTodo).get(findTodo).delete(deleteTodo);

module.exports = Router;
