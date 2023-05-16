const { connect, connection } = require("mongoose");
const appConfig = require("../../config/appConfig");
const startServer = require("../rest/server");
const startDB = (app) => {
	console.log(appConfig.db.uri);
	connect(`${appConfig.db.uri}`);

	connection.on("connected", () => {
		console.log("MongoDb Database Connect Successfully ");
	});
	connection.on("error", (e) => {
		console.log("MongoDb Database Connection Error", e);
	});
	connection.on("disconnect", () => {
		console.log("MongoDb Database Disconnected ");
	});
	startServer(app);
};

module.exports = {
	startDB,
};
