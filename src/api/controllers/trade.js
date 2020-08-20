const TradeService = require("../../services/trade");
const Security = require("../../models/security");
const { response, isDefObject } = require("../../utils/utils");
const { BadRequest } = require("../../utils/error");

const getTrades = async (req, res, next) => {
  const trades = await TradeService.getTrades();
  return res.status(200).json(response(200, "All trades", trades));
};

const addTrade = async (req, res, next) => {
  if (!isDefObject(req.body))
    return res
      .status(400)
      .json(response(400, "Missing attributes required", null));

  const { ticker, buyPrice, shares } = req.body;
  const securityModel = { ticker: ticker.toUpperCase(), buyPrice, shares };
  const security = new Security(securityModel);

  const savedTrade = await security.save().catch((error) => {
    return res.status(400).json(response(400, error, null));
  });
  return res
    .status(201)
    .json(response(201, "Trade has been added to portfolio", savedTrade));
};

const updateTrade = async (req, res, next) => {
  if (!isDefObject(req.body))
    return res
      .status(400)
      .json(response(400, "Missing attributes required", null));

  const { trade_id } = req.params;
  const { ticker, buyPrice, shares } = req.body;
  const updateTrade = { ticker, buyPrice, shares };
  const updatedTrade = await TradeService.updateTrade(trade_id, updateTrade);

  if (!updatedTrade)
    return res.status(400).json(response(400, "Trade not found", null));

  return res
    .status(202)
    .json(response(202, "Trade has been updated", updatedTrade));
};

const buyTrade = async (req, res, next) => {
  const { trade_id } = req.params;
  const { boughtShares, amount } = req.body;
  const { success, data, error } = await TradeService.buyTrade({
    trade_id,
    boughtShares,
    amount,
  });
  if (!success) return res.status(400).json(response(400, error, null));
  return res.status(200).json(response(200, "Shares has been brought", data));
};

const sellTrade = async (req, res, next) => {
  const { trade_id } = req.params;
  const { soldShares } = req.body;
  const { success, data, error } = await TradeService.sellTrade(
    trade_id,
    soldShares
  );
  if (!success) return res.status(400).json(response(400, error, null));
  return res.status(200).json(response(200, "Shares has been sold", data));
};

const removeTrade = async (req, res, next) => {
  const { trade_id } = req.params;

  const removedTrade = await Security.findByIdAndDelete(trade_id).catch(
    (error) => {
      return res.status(400).json(response(400, error, null));
    }
  );

  return res
    .status(200)
    .json(response(200, "Trade has been removed", removedTrade));
};

module.exports = {
  getTrades,
  addTrade,
  updateTrade,
  removeTrade,
  buyTrade,
  sellTrade,
};
