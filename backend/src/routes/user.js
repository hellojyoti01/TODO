const appConfig = require("../../config/appConfig");
const { signIn, signUp } = require("../controllers/aunthection.controller");
const validator = require("../middleware/userValidator");
module.exports.setRouter = (app) => {
	const { apiVersion } = appConfig;
	console.log(apiVersion, "base Url");
	app.post(`${apiVersion}/auth/sign_up`, validator.signup, signUp);
	app.post(`${apiVersion}/auth/sign_in`, validator.signin, signIn);
};
