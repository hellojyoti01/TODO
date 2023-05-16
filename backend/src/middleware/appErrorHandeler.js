const errorHandler = (err, req, res, next) => {
	if (err.isOperational) {
		return res.json({
			statusCode: err.statusCode,
			status: false,
			message: err.msg,
		});
	} else {
		const { ENVIROMENT } = process.env;

		return res.json({
			statusCode: 500,
			status: false,
			message: ENVIROMENT === "DEVELOPEMENT" ? err.message : "Server Down ",
		});
	}
};
const routeNotFound = (req, res, next) => {
	res.json({
		message: "Route Not Found",
	});
};
module.exports = {
	globalErrorMiddleware: errorHandler,
	globalRouteMiddleware: routeNotFound,
};
