const catcher = require("../libs/catcher");
const _Error = require("../libs/_ErrorLib");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const Token = require("../libs/tokenLib");
const responseLib = require("../libs/responceLib");
const signUp = catcher(async (req, res, next) => {
	const { name, email, password } = req.body;

	//Find user exist or not
	const user = await User.find({ email });
	console.log(user);
	if (user.length > 0)
		return next(new _Error("User Already Exist Plz Log IN !", 409));

	//Encrypted Password
	const enPassword = await bcrypt.hash(password, 12);

	//new User Create dataBase
	const newUser = await User.create({ name, email, password: enPassword });
	const token = await Token.generate(newUser);

	res.json({
		status: true,
		statusCode: "200ok",
		paylode: token,
		message: "User Create Succefully",
	});
});

const signIn = catcher(async (req, res, next) => {
	const { email, password } = req.body;

	//Find user in data base
	const user = await User.findOne({ email });
	//If user not exit then chek whoami route malesious activity run useEffect
	if (!user) return next(new _Error("Created Again", 404));

	//decrypt password and check user

	//@ts-ignore
	const decrypt = await bcrypt.compare(password, user.password);

	if (!decrypt) return next(new _Error("Invalid Password", 403));

	//Jwt Token created
	const token = await Token.generate(user);

	res.json({
		status: true,
		statusCode: "200ok",
		paylode: token,
		message: "Log In Succefully",
	});
});

module.exports = { signIn, signUp };
