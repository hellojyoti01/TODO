const jwt = require("jsonwebtoken");
const _Error = require("../libs/_ErrorLib");
const generateToken = (data) => {
	return new Promise((resolve, reject) => {
		try {
			resolve(
				jwt.sign(
					{
						data,
					},
					"secret",
					{ expiresIn: "365h" }
				)
			);
		} catch (e) {
			reject(e);
		}
	});
};

const verifayToken = (data) => {
	return new Promise((resolve, reject) => {
		jwt.verify(data, "secret", function (err, decode) {
			if (err) {
				reject(err);
			} else {
				resolve(decode);
			}
		});
	});
};
module.exports = {
	generate: generateToken,
	verify: verifayToken,
};
