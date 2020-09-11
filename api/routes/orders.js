const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order was created'
    })
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        id: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Your order is deleted'
    })
})

module.exports = router;