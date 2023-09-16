const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/students-ddbb";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    autoIndex: true,
  })
  .then((response) =>
    console.log(
      `Connected to Mongo! Database name: "${response.connections[0].name}"`
    )
  )
  .catch((err) => console.error("Error connecting to mongo", err));

process.on("SIGINT", function () {
  mongoose.connection.close();
});
