const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders');
const checkAuth = require('../middleware/check-auth');

router.post('/', OrdersController.order_create);
router.get('/', checkAuth, OrdersController.order_get_all);
router.get('/:orderId', checkAuth, OrdersController.order_get_byId);
router.delete('/:orderId', checkAuth, OrdersController.order_delete);

module.exports = router;