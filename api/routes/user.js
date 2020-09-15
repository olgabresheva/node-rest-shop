const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user');

router.post('/signup', userControllers.user_create);
router.post('/login', userControllers.user_login);
router.delete('/:userId', userControllers.user_delete);
router.get('/', userControllers.user_get_all);
router.get('/:userId', userControllers.user_get_byID);

module.exports = router;