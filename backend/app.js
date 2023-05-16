const envConfig = require("dotenv").config();
if (envConfig.error) {
	throw new Error("Env File Required Root Directory");
}

const express = require("express");
const appConfig = require("./config/appConfig");
const dbConfig = require("./config/dbConfig.json");
const database = require("./www/db/db");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const Error = require("./src/middleware/appErrorHandeler");

//Middleware
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//Router Connected
// const user = require("./src/routes/user");
// const todo = require("./src/routes/todo");
// user.setRouter(app);
// todo.setRouter(app);

const routes = "./src/routes";
fs.readdirSync(routes).forEach(function (file) {
	if (~file.indexOf(".js")) {
		let route = require(routes + "/" + file);
		route.setRouter(app);
	}
});
app.use(Error.globalErrorMiddleware);
app.use(Error.globalRouteMiddleware);
//Databse Connected
database.startDB(app);
