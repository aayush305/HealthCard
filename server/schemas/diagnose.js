const mongoose = require("mongoose");
var diagnose = new mongoose.Schema({
  userId: String,
  docId: String,
  Date: { type: Date, default: new Date().toLocaleDateString() },
  symptoms: [],
  conclusion: String,
  reportdNeeded: [],
  prescriptionId: String,
  reportIds: [],
  treatementDesc: String
});
var dignoseModel = mongoose.model("diagnose", diagnose);

module.exports = dignoseModel;
