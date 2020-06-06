const mongoose = require("mongoose");
var labreport = new mongoose.Schema({
  labid:String,
  report: String,
  daignose_id: String
});
var labreport = mongoose.model("labreport", labreport);

module.exports = labreport;
