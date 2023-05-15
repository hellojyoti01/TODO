const catcher = require("../util/catcher");
const _Error = require("../Error/_Error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/model/user.model");
const signUp = catcher(async (req, res, next) => {
	const { name, email, password } = req.body;

	//Validation
	if (!name || !email || !password)
		return next(new _Error("Validation Error", 412));

	//Find user exist or not
	const user = await User.find({ email });
	if (user) next(new _Error("User Already Exist Plz Log IN !"));

	//Encrypted Password
	const enPassword = await bcrypt.hash(password, 12);

	//new User Create dataBase
	const newUser = await User.create({ name, email, password: enPassword });

	//Jwt Token created
	const token = jwt.sign(
		{
			data: newUser,
		},
		"secret",
		{ expiresIn: "365h" }
	);
	res.json({
		status: true,
		statusCode: "200ok",
		paylode: token,
		message: "User Create Succefully",
	});
});

const signIn = catcher(async (req, res, next) => {
	const { name, email, password } = req.body;

	console.log(email, password, "email--password");
	//Validation
	if (!email || !password) return next(new _Error("Validation Error", 412));

	//Find user in data base
	const user = await User.findOne({ email });
	if (!user) return next(new _Error("Created Again", 404));

	//decrypt password and check user

	//@ts-ignore
	const decrypt = await bcrypt.compare(password, user.password);

	if (!decrypt) return next(new _Error("Invalid Password"));

	//Jwt Token created
	const token = jwt.sign(
		{
			data: user,
		},
		"secret",
		{ expiresIn: "365h" }
	);
	res.json({
		status: true,
		statusCode: "200ok",
		paylode: token,
		message: "Log In Succefully",
	});
});

module.exports = { signIn, signUp };
