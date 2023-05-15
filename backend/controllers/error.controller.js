const ErrorHandler = (err, req, res, next) => {
	if (err.isOperational) {
		res.json({
			statusCode: err.statusCode,
			status: false,
			message: err.msg,
		});
	}

	const { ENVIROMENT } = process.env;
	res.json({
		statusCode: 500,
		status: false,
		message:
			ENVIROMENT === "DEVELOPEMENT" ? JSON.stringify(err) : "Server Down ",
	});
};

module.exports = ErrorHandler;
