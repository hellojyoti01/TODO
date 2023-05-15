const catcher = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (e) {
			next(e);

			console.log("Error==>", e);
		}
	};
};

module.exports = catcher;
