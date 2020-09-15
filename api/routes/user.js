const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const userControllers = require('../controllers/user');

router.post('/signup', userControllers.user_create);
router.post('/login', userControllers.user_login);
router.delete('/:userId', checkAuth, userControllers.user_delete);
router.get('/', userControllers.user_get_all);
router.get('/:userId', userControllers.user_get_byID);

module.exports = router;