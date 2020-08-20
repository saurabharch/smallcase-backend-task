const tradeRouter = require("express").Router();

const {
  getTrades,
  addTrade,
  updateTrade,
  removeTrade,
  buyTrade,
  sellTrade,
} = require("../../controllers/trade");

tradeRouter.route("/").get(getTrades).post(addTrade);

tradeRouter.route("/:trade_id").patch(updateTrade).delete(removeTrade);
tradeRouter.route("/:trade_id/buys").patch(buyTrade);
tradeRouter.route("/:trade_id/sells").patch(sellTrade);

module.exports = tradeRouter;
