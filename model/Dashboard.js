const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  name: String,
  aum: String,
  pan: String,
  category: String,
});

const dashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  aum: String,
  nav: String,
  fundsManaged: Number,
  avgReturns: String,
  latestReturn: String,
  expenseRatio: String,
  fundHouseRating: Number,
  schemeData: [schemeSchema],
  monthlyReturns: [Number],
  benchmark: [Number],
  benchmarkBase: [Number],
  barChart: [Number],
  pieChart: [Number],
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', dashboardSchema);
