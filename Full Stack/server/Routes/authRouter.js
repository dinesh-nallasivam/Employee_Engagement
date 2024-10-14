const { login, protection, logout } = require('../Controllers/Auth/auth.js');
const { Router } = require('express');

const router = Router()

router.post('/login', login)
router.get('/logout', protection,logout)

module.exports = router;