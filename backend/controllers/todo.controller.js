const Todo = require("../database/model/todo.model");
const catcher = require("../util/catcher");
const _Error = require("../Error/_Error");
const addTodo = catcher(async (req, res, next) => {
	const { description = undefined } = req.body;

	if (!description) return next(new _Error("Entity are required", 422));

	const todo = await Todo.create({
		description,
		user: req._user._id,
	});

	res.json({
		status: true,
		statusCode: 200,
		payload: todo,
		message: "Task Add Successfully",
	});
});
const modifayTodo = catcher(async (req, res, next) => {
	console.log(req.params);
	const { id } = req.params;
	const { description } = req.body;
	const todo = await Todo.findByIdAndUpdate(id, { description });
	if (!todo) return next(new _Error("task not exist", 404));

	res.json({
		status: true,
		statusCode: "200ok",
		message: "successfully Update",
	});
});
const deleteTodo = catcher(async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	const todo = await Todo.findByIdAndDelete(id);
	// if (!todo) return next(new _Error("Task Not Exit", 404));

	res.json({
		status: true,
		statusCode: "200ok",
		message: "successfully Delete",
	});
});
const deleteAll = catcher(async (req, res, next) => {
	const todo = await Todo.deleteMany();
	// if (!todo) return next(new _Error("Task Not Exit", 404));

	res.json({
		status: true,
		statusCode: "200ok",
		message: "successfully All Todo Delete",
	});
});
const getAllTodo = catcher(async (req, res, next) => {
	const { id } = req.query;
	const todo = await Todo.find({ user: req._user._id }).limit(6).skip(id);
	res.json({
		status: true,
		statusCode: "200ok",
		payload: todo,
		message: "Task Retrived Successfully",
	});
});
const findTodo = catcher(() => {});

module.exports = {
	addTodo,
	modifayTodo,
	deleteTodo,
	findTodo,
	getAllTodo,
	deleteAll,
};
