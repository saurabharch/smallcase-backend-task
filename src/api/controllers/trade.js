const TradeService = require("../../services/trade");
const { response, isDefObject } = require("../../utils/utils");

const getTrades = async (req, res, next) => {
  const trades = await TradeService.getTrades();
  return res.status(200).json(response(200, "All trades", trades));
};

const addTrade = async (req, res, next) => {
  const { ticker, buyPrice, shares } = req.body;
  if (!isDefObject(req.body) || !ticker || !buyPrice || !shares)
    return res
      .status(400)
      .json(response(400, "Missing attributes required", null));

  const securityModel = { ticker: ticker.toUpperCase(), buyPrice, shares };
  const savedTrade = await TradeService.addTrade(securityModel).catch(
    (error) => {
      return res.status(400).json(response(400, error, null));
    }
  );
  return res
    .status(201)
    .json(response(201, "Trade has been added to portfolio", savedTrade));
};

const updateTrade = async (req, res, next) => {
  const { ticker, buyPrice, shares } = req.body;
  if (!isDefObject(req.body) || !ticker || !buyPrice || !shares)
    return res
      .status(400)
      .json(response(400, "Missing attributes required", null));

  const { trade_id } = req.params;
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

  if (!isDefObject(req.body) || !boughtShares || !amount)
    return res
      .status(400)
      .json(response(400, "Missing attributes required", null));

  const { success, data, error } = await TradeService.buyTrade({
    trade_id,
    boughtShares,
    amount,
  }).catch((error) => {
    return res.status(400).json(response(400, error, null));
  });
  if (!success) return res.status(409).json(response(409, error, null));
  return res.status(200).json(response(200, "Shares has been brought", data));
};

const sellTrade = async (req, res, next) => {
  const { trade_id } = req.params;
  const { sellShares } = req.body;

  if (!isDefObject(req.body) || !sellShares)
    return res
      .status(400)
      .json(response(400, "Missing attributes required", null));

  const { success, data, error } = await TradeService.sellTrade(
    trade_id,
    sellShares
  ).catch((error) => {
    return res.status(409).json(response(409, error, null));
  });
  if (!success) return res.status(409).json(response(409, error, null));
  return res.status(200).json(response(200, "Shares has been sold", data));
};

const removeTrade = async (req, res, next) => {
  const { trade_id } = req.params;

  const removedTrade = await TradeService.removeTrade(trade_id).catch(
    (error) => {
      return res.status(400).json(response(400, error, null));
    }
  );
  if (!removedTrade)
    return res.status(409).json(response(409, "Trade not found", null));
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
