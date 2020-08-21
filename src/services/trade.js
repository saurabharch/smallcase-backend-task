const Container = require("typedi").Container;
const Security = require("../models/security");
const { GeneralError } = require("../utils/error");

class TradeService {
  //Trade DAO methods
  async addTrade(model) {
    try {
      const security = new Security(model);
      return await security.save();
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async getTrades() {
    try {
      return await Security.find();
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async getTrade(trade_id) {
    try {
      return await Security.findById(trade_id);
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async updateTrade(trade_id, updatedTrade) {
    try {
      return await Security.findByIdAndUpdate(trade_id, updatedTrade, {
        new: true,
      });
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async removeTrade(trade_id) {
    try {
      return await Security.findByIdAndDelete(trade_id);
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  //Trade Services
  async buyTrade({ trade_id, boughtShares, amount }) {
    try {
      const currentTradeValues = await this.getTrade(trade_id);
      if (!currentTradeValues)
        return {
          success: false,
          data: currentTradeValues,
          error: "Trade is not present is portfolio",
        };
      const { shares, buyPrice } = currentTradeValues;
      /* Update average value and shares
        updatedSecurity = (currentPrice * currentShares + boughtTotalShareAmount * noOfShares) / (noOfShares + currentShares) 
      */
      const updatedBuyPrice =
        (buyPrice * shares + amount * boughtShares) / (boughtShares + shares);
      const updatedShares = boughtShares + shares;
      const updatedSecurity = {
        buyPrice: updatedBuyPrice.toFixed(2),
        shares: updatedShares,
      };
      const updatedTrade = await this.updateTrade(trade_id, updatedSecurity);
      return { success: true, data: updatedTrade, error: null };
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async sellTrade(trade_id, sellShares) {
    if (sellShares <= 0)
      return { success: false, data: null, error: "Enter valid shares number" };
    const currentTradeValues = await this.getTrade(trade_id);
    if (!currentTradeValues)
      return {
        success: false,
        data: currentTradeValues,
        error: "Trade is not present is portfolio",
      };
    const { shares } = currentTradeValues;
    if (shares >= sellShares) {
      //Calculate and update document
      const remainingShares = shares - sellShares;
      const updatedShares = { shares: remainingShares };
      const updatedTrade = await this.updateTrade(trade_id, updatedShares);
      return { success: true, data: updatedTrade, error: null };
    }
    return {
      success: false,
      data: null,
      error: "Don't have enough shares to sell",
    };
  }
}

module.exports = Container.get(TradeService);
