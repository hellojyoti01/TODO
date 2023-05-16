const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
		},
		description: {
			type: String,
			required: true,
			max: 1000,
		},
	},
	{ timestamps: true }
);

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
