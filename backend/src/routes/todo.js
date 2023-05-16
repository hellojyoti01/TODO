const appConfig = require("../../config/appConfig");

const {
	addTodo,
	modifayTodo,
	deleteTodo,
	findTodo,
	getAllTodo,
	deleteAll,
} = require("../controllers/todo.controller");
// const { whoAmI, verify } = require("../controllers/authorization.controller");
const { isAuthorized } = require("../middleware/auth");
module.exports.setRouter = (app) => {
	const { apiVersion } = appConfig;
	app.get(`${apiVersion}/todo/get`, isAuthorized, getAllTodo);
	app.post(`${apiVersion}/todo/add`, isAuthorized, addTodo);
	app.put(`${apiVersion}/todo/:id`, isAuthorized, modifayTodo);
	app.delete(`${apiVersion}/todo/:id`, isAuthorized, deleteTodo);
};
