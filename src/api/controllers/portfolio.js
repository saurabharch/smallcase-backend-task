const PortfolioService = require("../../services/portfolio");
const TradeService = require("../../services/trade");
const { response } = require("../../utils/utils");

const getTrades = async (req, res, next) => {
  const trades = await TradeService.getTrades();
  return res.status(200).json(response(200, "All trades", trades));
};

const getHoldings = async (req, res, next) => {
  const holdings = await PortfolioService.getHoldings();

  if (holdings.length === 0)
    return res
      .status(204)
      .json(response(204, "0 securities in portfolio", null));

  const [{ totalShares, totalBoughtSharesAmount }] = holdings;

  return res.status(200).json(
    response(200, "Holdings of all trades in portfolio", {
      totalShares,
      totalBoughtSharesAmount,
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
