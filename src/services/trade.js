const Container = require("typedi").Container;
const Security = require("../models/security");
const {  GeneralError } = require("../utils/error");

class TradeService {

  async getTrades() {
    return await Security.find().catch((error) => {
      throw new GeneralError(error);
    });
  }

  async getTrade(trade_id) {
    try {
      return await Security.findById(trade_id);
    } catch (error) {
      throw new GeneralError(error);
    }
  }

  async updateTrade(trade_id, updatedTrade) {
    return await Security.findByIdAndUpdate(trade_id, updatedTrade).catch(
      (error) => {
        throw new GeneralError(error);
      }
    );
  }

  async buyTrade({ trade_id, boughtShares, amount }) {
    const currentTradeValues = await this.getTrade(trade_id);
    if (!currentTradeValues)
      return {
        success: false,
        data: currentTradeValues,
        error: "Trade is not present is portfolio",
      };
    const { shares, buyPrice } = currentTradeValues;
    const updatedBuyPrice =
      (buyPrice * shares + amount * boughtShares) / (boughtShares + shares);
    const updatedShares = boughtShares + shares;
    const updatedSecurity = {
      buyPrice: updatedBuyPrice,
      shares: updatedShares,
    };
    const updatedTrade = await this.updateTrade(trade_id, updatedSecurity);
    return { success: true, data: updatedTrade, error: null };
  }

  async sellTrade(trade_id, soldShares) {
    if (soldShares <= 0)
      return { success: false, data: null, error: "Enter valid shares number" };
    const currentTradeValues = await this.getTrade(trade_id);
    if (!currentTradeValues)
      return {
        success: false,
        data: currentTradeValues,
        error: "Trade is not present is portfolio",
      };
    const { shares } = currentTradeValues;
    if (shares >= soldShares) {
      //Calculate
      const remainingShares = shares - soldShares;
      const updatedShares = { shares: remainingShares };
      const updatedTrade = await this.updateTrade(trade_id, updatedShares);
      console.log(updatedTrade);
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
