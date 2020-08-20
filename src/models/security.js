const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const SecuritySchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  buyPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  shares: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

//SecuritySchema.indexes({ $text: ticker });

SecuritySchema.plugin(timestamp);

module.exports = mongoose.model("Security", SecuritySchema);
