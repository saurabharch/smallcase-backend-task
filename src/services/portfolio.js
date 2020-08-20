const Container = require("typedi").Container;

const Security = require("../models/security");
const { GeneralError } = require("../utils/error");

class PortfolioServices {
  async getHoldings() {
    try {
      const totalAggregate = await Security.aggregate([
        {
          $group: {
            _id: null,
            totalShares: { $sum: "$shares" },
            totalBuyPrice: { $sum: "$buyPrice" },
          },
        },
      ]);
      return totalAggregate;
    } catch (error) {
      throw new GeneralError(error);
    }
  }
}

module.exports = Container.get(PortfolioServices);
