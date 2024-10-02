const { protection } = require('../Controllers/auth.js');
const { dashboard } = require('../Controllers/dashboard.js');
const { Router } = require('express');

const router = Router()

router.get('/dashboard', protection, dashboard)

module.exports = router;