const express = require('express');
const { getDashboard, createSampleDashboard } = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getDashboard);
router.post('/create', auth, createSampleDashboard);

module.exports = router;
