const mongoose = require("mongoose");

const connect = (uri) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
