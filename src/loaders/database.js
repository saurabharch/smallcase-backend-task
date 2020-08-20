const mongoose = require("mongoose");
const { config } = require("../configs/index");
const { GeneralError } = require("../utils/error");

mongoose
  .connect(config.DB.URL, {
    dbName: config.DB.NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => {
    console.log("Not able to connect database");
  });
