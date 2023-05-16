const joi = require("joi");
const _Error = require("../libs/_ErrorLib");
const catcher = require("../libs/catcher");
const signup = catcher(async (req, res, next) => {
	const { name, email, password } = req.body;

	//Joi Schema For Validation
	const schema = joi.object({
		name: joi.string().alphanum().min(4).max(10).required(),
		email: joi
			.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required(),
		password: joi.string().min(6).max(15).required(),
	});

	try {
		const value = await schema.validateAsync({ name, email, password });
		if (value) {
			next();
		}
	} catch (e) {
		//Setup Error scham
		console.log(e.message);
		next(new _Error(e.message, 403));
	}
});

const signin = catcher(async (req, res, next) => {
	const { email, password } = req.body;

	//Joi Schema For Validation
	const schema = joi.object({
		email: joi
			.string()
			.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
			.required(),
		password: joi.string().min(6).max(15).required(),
	});

	try {
		const value = await schema.validateAsync({ email, password });
		if (value) {
			next();
		}
	} catch (e) {
		//Setup Error scham
		// console.log(e.message);
		next(new _Error(e.message, 403));
	}
});
module.exports = {
	signup,
	signin,
};
