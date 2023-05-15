const dotenv = require("dotenv");

dotenv.config();
require("./database");

const { PORT } = process.env;
const app = require("./server");

app.listen(PORT || 3030, () => {
	console.log(`Server Started ${PORT}`);
});
