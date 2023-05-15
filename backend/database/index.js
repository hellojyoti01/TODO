const { connect, connection } = require("mongoose");

connect(
	`mongodb+srv://chiku:${process.env.PASSWORD}@cluster0.zmo6ugy.mongodb.net/Todo?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

connection.on("connected", () => {
	console.log("Database Connect Successfully");
});
connection.on("error", () => {
	console.log("Database Connection Error");
});
connection.on("disconnect", () => {
	console.log("Database Disconnected");
});
