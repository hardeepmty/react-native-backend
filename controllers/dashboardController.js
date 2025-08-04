const Dashboard = require("../model/Dashboard")

const getDashboard = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.user._id });
    if (!dashboard) return res.status(404).json({ status: 0, msg: 'Dashboard not found' });

    return res.json({ status: 1, data: dashboard });
  } catch (err) {
    return res.status(500).json({ status: 0, msg: err.message });
  }
};

const createSampleDashboard = async (req, res) => {
  try {
    const existing = await Dashboard.findOne({ userId: req.user._id });
    if (existing) return res.status(400).json({ status: 0, msg: 'Dashboard already exists' });

    const dashboard = new Dashboard({
      userId: req.user._id,
      aum: '₹4,527 Cr',
      nav: '₹112.45',
      fundsManaged: 14,
      avgReturns: '+12.5%',
      latestReturn: '+3.2%',
      expenseRatio: '1.10%',
      fundHouseRating: 4.5,
      schemeData: [
        { name: 'Quest Equity Growth Fund', aum: '₹1,200 Cr', pan: 'QEF12345' },
        { name: 'Quest Debt Income Fund', aum: '₹850 Cr', pan: 'QDF67890' },
        { name: 'Quest Multi-Asset Fund', aum: '₹1,500 Cr', pan: 'QMF11223' },
        { name: 'Quest Gold Savings Fund', aum: '₹477 Cr', pan: 'QGS44556' },
        { name: 'Quest Small Cap Fund', aum: '₹500 Cr', pan: 'QSC77889' },
      ],
      monthlyReturns: [4.5, 5.6, 6.7, 4.9, 6.2, 7.0],
      benchmark: [100, 102, 105, 103, 107, 110],
      benchmarkBase: [100, 101, 103, 102, 105, 108],
      barChart: [18, 7, 12, 5],
      pieChart: [40, 30, 15, 15],
    });

    await dashboard.save();
    res.json({ status: 1, msg: 'Dashboard created successfully' });
  } catch (err) {
    return res.status(500).json({ status: 0, msg: err.message });
  }
};

module.exports = { getDashboard, createSampleDashboard };
