const Todo = require("../model/todo");
const catcher = require("../util/catcher");
const _Error = require("../libs/_ErrorLib");

//Create
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

//Update
const modifayTodo = catcher(async (req, res, next) => {
	const { id } = req.params;
	const { description } = req.body;

	//Find Todo
	const todo = await Todo.findById(id);
	if (!todo) return next(new _Error("task not exist", 404));

	//Check Current user create or not
	if (todo.user?.toString() !== req._user._id.toString())
		return next(new _Error("Malicious activity", 406));

	//update todo
	todo.description = description;
	await todo.save();
	res.json({
		status: true,
		statusCode: "200ok",
		message: "successfully Update",
	});
});

//Delete
const deleteTodo = catcher(async (req, res, next) => {
	const { id } = req.params;

	//Find Todo
	const todo = await Todo.findById(id);
	if (!todo) return next(new _Error("task not exist", 404));

	//Check Current user create or not
	if (todo.user?.toString() !== req._user._id.toString())
		return next(new _Error("Malicious activity", 406));

	//Delete Todo
	await Todo.findByIdAndDelete(id);
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
