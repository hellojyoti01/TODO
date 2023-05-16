const appConfig = require("../../config/appConfig");
const startServer = (app) => {
	app.listen(appConfig.PORT || 3030, () => {
		console.log(`Server Started ${appConfig.PORT}`);
	});
};

module.exports = startServer;
