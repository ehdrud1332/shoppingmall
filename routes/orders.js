const express = require('express');
const router = express.Router();
const orderModel = require("../models/order");
const productModel = require("../models/product");
// 장바구니를 불러오는 API
router.get('/', (req, res) => {
   orderModel
        .find()
        .exec()
        .then(docs => {
            res.json({
                count: docs.length,
                orderlist: docs
            });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});

// 장바구니를 생성하는 API
router.post('/', (req, res) => {
    
    productModel
        .findById(req.body.product)
        .then(product => {
            if(!product){
                return res.json({
                    msg : "product not found"
                });
            } else {
                const order =  new orderModel({
                    product: req.body.product,
                    qty: req.body.qty
                
                });
                return order.save();
            }
        })
        .then(result => {
            res.json({
                msg : "created order",
                createdOrder: {
                    product: result.product,
                    qty: result.qty,
                    id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:2020/order/"
                    }
                }
            });

        })
        .catch(err => {
            res.json({
                error : err
            })
        });
});

// 장바구니를 수정하는 API
router.patch('/', (req, res) => {
    res.json({
        msg : "장바구니를 수정함"
    });
});

// 장바구니를 삭제 API
router.delete('/', (req, res) => {
    res.json({
        msg : "장바구니를 삭제함"
    });
});


module.exports = router; 