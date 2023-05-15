class _Error extends Error {
	constructor(msg, statusCode) {
		super(msg);

		this.msg = msg;
		this.statusCode = statusCode;
		this.isOperational = true;
		this.stackTrace = Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = _Error;
