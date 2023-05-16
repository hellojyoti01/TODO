const appConfig = require("../../config/appConfig");
const { whoAmI } = require("../middleware/auth");
module.exports.setRouter = (app) => {
	const { apiVersion } = appConfig;
	console.log(apiVersion, "base Url");
	app.get(`${apiVersion}/whoami`, whoAmI);
};
