module.exports = (app) => {
  const express = require("express");
  const path = require("path");
  const cors = require("cors");

  const apiRouter = require("../api/routes/index");
  const errorHandler = require("../helpers/error-handler");

  require("./logger")(app);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cors());
  app.use("/api", apiRouter);
  app.use(errorHandler);
};
