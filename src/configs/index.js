require("dotenv").config();

exports.config = {
  HOSTNAME: process.env.HOSTNAME,
  PORT: parseInt(process.env.PORT) || 3000,
  DB: {
    URL: process.env.DB_URL,
    NAME: process.env.DB_NAME,
  },
};
