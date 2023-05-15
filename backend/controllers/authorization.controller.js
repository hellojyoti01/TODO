const catcher = require("../util/catcher");
const _Error = require("../Error/_Error");
const jwt = require("jsonwebtoken");
const User = require("../database/model/user.model");

const whoAmI = catcher(async (req, res, next) => {
	const { auth } = req.headers;

	//Verify Token
	const verify = await jwt.verify(auth, "secret");
	if (!verify) return next(new _Error("Invalid User Log In Again", 412));

	const user = await User.findById({ _id: verify?.data?._id });
	if (!user) return next(new _Error("Created Again", 404));
	req._user = user;
	res.json({
		status: true,
		statusCode: "200ok",
		paylode: user,
	});
});
module.exports = {
	whoAmI,
};
