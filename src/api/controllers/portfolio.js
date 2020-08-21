const PortfolioService = require("../../services/portfolio");
const TradeService = require("../../services/trade");
const { response } = require("../../utils/utils");

const getTrades = async (req, res, next) => {
  const trades = await TradeService.getTrades();
  return res.status(200).json(response(200, "All trades", trades));
};

const getHoldings = async (req, res, next) => {
  const [
    { totalShares, totalBoughtShares },
  ] = await PortfolioService.getHoldings();

  return res.json(
    response(200, "Holdings of all trades in portfolio", {
      totalShares,
      totalBoughtShares,
    })
  );
};

const getCumulativeReturns = async (req, res, next) => {
  const cumulativeReturns = await PortfolioService.getCumulativeReturns();
  return res
    .status(200)
    .json(
      response(200, "Cumulative returns for portfolio", { cumulativeReturns })
    );
};

module.exports = {
  getTrades,
  getHoldings,
  getCumulativeReturns,
};
