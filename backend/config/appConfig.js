const dbConfig = require("./dbConfig.json");

const appConfig = {};
//@ts-ignore
appConfig.JWT_KEY = process.env.JWT_KEY;
appConfig.MONGO_PORT = dbConfig.dev.port;
//@ts-ignore
appConfig.PORT = process.env.PORT;
appConfig.apiVersion = "/api/v1";

appConfig.db = {
	uri: `mongodb+srv://${dbConfig.dev.username}:${dbConfig.dev.password}@cluster0.zmo6ugy.mongodb.net/Todo?retryWrites=true&w=majority`,
};

appConfig.baseUri = `http://localhost:6050/api/v1`;
module.exports = appConfig;
