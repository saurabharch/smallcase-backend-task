const portfolioRouter = require("express").Router();
const {
  getHoldings,
  getTrades,
  getCumulativeReturns,
} = require("../../controllers/portfolio");

portfolioRouter.route("/").get(getTrades);
portfolioRouter.route("/holdings").get(getHoldings);
portfolioRouter.route("/cumulative_returns").get(getCumulativeReturns);

module.exports = portfolioRouter;
