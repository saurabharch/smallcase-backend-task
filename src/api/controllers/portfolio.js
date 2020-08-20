const PortfolioServices = require("../../services/portfolio");
const TradeService = require("../../services/trade");
const { response } = require("../../utils/utils");

const getTrades = async (req, res, next) => {
  const trades = await TradeService.getTrades();
  return res.status(200).json(response(200, "All trades", trades));
};

const getHoldings = async (req, res, next) => {
  const totalAggregate = await PortfolioServices.getHoldings();
  return res.json(
    response(200, "Holdings of all trades in portfolio", totalAggregate)
  );
};

const getCumulativeReturn = async (req, res, next) => {};

module.exports = {
  getTrades,
  getHoldings,
  getCumulativeReturn,
};
