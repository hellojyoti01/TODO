const mongoose = require("mongoose");

const User = mongoose.model("User", require("../schema/user.schema"));
module.exports = User;
