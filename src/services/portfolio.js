const Container = require("typedi").Container;
const TradeService = require("./trade");
const Security = require("../models/security");
const { GeneralError } = require("../utils/error");

class PortfolioService {
  async getHoldings() {
    try {
      const totalAggregate = await Security.aggregate([
        {
          $group: {
            _id: null,
            totalShares: { $sum: "$shares" },
            totalBoughtShares: { $sum: "$buyPrice" },
          },
        },
      ]);
      return totalAggregate;
    } catch (error) {
      throw new GeneralError(error);
    }
  }
  async getCumulativeReturns() {
    /* 
    CUMULATIVE_RETURNS = SUM((CURRENT_PRICE[ticker] - AVERAGE_BUY_PRICE[ticker]) *
    CURRENT_QUANTITY[ticker])
    */
    const currentPrice = 100;
    let cumulativeReturns = 0;
    const trades = await TradeService.getTrades();
    if (trades.length === 0) return cumulativeReturns;
    trades.forEach((trade) => {
      cumulativeReturns =
        cumulativeReturns + (currentPrice - trade.buyPrice) * trade.shares;
    });
    return cumulativeReturns;
  }
}

module.exports = Container.get(PortfolioService);
