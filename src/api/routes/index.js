const router = require("express").Router();

const tradeRouter = require("./modules/trade");
const portfolioRouter = require("./modules/portfolio");

//API routes
router.use("/v1/trades", tradeRouter);
router.use("/v1/portfolios", portfolioRouter);

module.exports = router;
