const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", require("../schema/todo.schema"));
module.exports = Todo;
