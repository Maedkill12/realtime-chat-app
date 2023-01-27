require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./db/connect");
const authRouter = require("./routes/auth");
const errorHandle = require("./middleware/errorHandle");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use(errorHandle);

app.listen(PORT, async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(`Server listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
