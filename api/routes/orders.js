const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/product');

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    })
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            })
        });
});


router.get('/', (req, res, next) => {
    const productId = Product.findById(req.body.productId);
    Order.find()
        .select('_id product quantity')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        orderId: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/'+ doc._id
                        }}
                })}
                res.status(200).json(response);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .select('_id product quantity')
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Selected Order details',
                order: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Your order is deleted',
                body: {
                    type: 'POST',
                    url: 'http://localhost:3000/',
                    body: {"product": "String", "quantity": "Number"}
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

module.exports = router;