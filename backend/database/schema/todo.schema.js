const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
			max: 1000,
		},
	},
	{ timestamps: true }
);

module.exports = TodoSchema;
