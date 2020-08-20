const portfolioRouter = require("express").Router();
const {
  getHoldings,
  getTrades,
  getCumulativeReturn,
} = require("../../controllers/portfolio");

portfolioRouter.route("/").get(getTrades);
portfolioRouter.route("/holdings").get(getHoldings);
portfolioRouter.route("/cumulative_returns").get(getCumulativeReturn);

module.exports = portfolioRouter;
