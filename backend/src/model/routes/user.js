const appConfig = require("../../../config/appConfig");
const { signIn, signUp } = require("../../controllers/aunthection.controller");
module.exports.setRouter = (app) => {
	const { baseUri } = appConfig;
	app.post(`${baseUri}/auth/sign_up`, signUp);
	app.post(`${baseUri}/auth/sign_in`, signIn);
};
