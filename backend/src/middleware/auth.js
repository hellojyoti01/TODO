const catcher = require("../util/catcher");
const _Error = require("../libs/_ErrorLib");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Token = require("../libs/tokenLib");

const isAuthorized = catcher(async (req, res, next) => {
	const { auth } = req.headers;

	if (!auth) return next(new _Error("Token Must Be Required", 502));
	//Verify Token
	const verify = await Token.verify(auth);

	//@ts-ignore
	//check user exit or not in database
	const user = await User.findById({ _id: verify?.data?._id });
	if (!user) return next(new _Error("Account Not Exist Create Again !!", 404));
	req._user = user;
	next();
});

const whoAmI = catcher(async (req, res, next) => {
	const { auth } = req.headers;
	if (!auth) return next(new _Error("Token Must Be Required", 502));

	//Verify Token
	const verify = await Token.verify(auth);

	//@ts-ignore
	//check user exit or not in database
	const user = await User.findById({ _id: verify?.data?._id });
	if (!user) return next(new _Error("Account Not Exist Create Again !!", 404));
	req._user = user;
	res.json({
		status: true,
		statusCode: "200ok",
		paylode: user,
	});
});

module.exports = {
	isAuthorized: isAuthorized,
	whoAmI: whoAmI,
};
