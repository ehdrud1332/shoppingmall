const express = require('express');
const router = express.Router();
const orderModel = require("../models/order");
const productModel = require("../models/product");

// 장바구니를 생성하는 API
router.post('/', (req, res) => {

    productModel 
        .findById(req.body.product)
        .then(product => {
            if(!product){
                return res.json({
                    msg : "product not Found"
                });
            } else {
                const order = new orderModel({
                    product: req.body.product,
                    qty : req.body.qty
                });
            return order.save
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
                        type: "Get",
                        url: "http://localhost:1997?orde/r"
                    }
                }
            });
        })
        .catch(err => {
            res.json({
                error : err
            });
        })
    
   
});


// 전체 장바구니를 불러오는 API
router.get('/', (req, res) => {

    orderModel
    .find()
    .exec()
    .then(docs => {

        res.json({
            count: docs.length,
            orderlist : docs.map(doc => {
                return{
                    id: doc._id,
                    product: doc.product,
                    qty: doc.qty
                
                }
            })
        })
    })
    .catch(err => {
        res.json({
            error: err
        })
    });
});
// detail order API
router.get('/:orderID', (req, res) => {
    const id = req.params.orderID;

    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            res.json({
                product: doc.product,
                qty: doc.qty
            });
        })
        .catch(err => {
            res.json({
                error: err
            })
        });
})



// 장바구니를 수정하는 API
router.patch('/:orderID', (req, res) => {
    const id = req.params.orderID

    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .update({_id: id}, {$set: updateOps})
        .then(result => {
            res.json({
                msg : "updated massgae",
                request: {
                    type: "GET",
                    url: "http://localhost:1997/order/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })

    });        


// 장바구니를 삭제 API
router.delete('/', (req, res) => {

    orderModel
        .deleteMany()
        .then(() => {
            res.json({
                msg : "deleted order"
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        });
});


//특정 장바구니를 삭제하는 API
router.delete('/:orderID', (req, res) => {
    const id = req.params.orderID;

    orderModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                msg : "deleted order",
                request: {
                    type: "GET",
                    url: "http://localhost:1997/order"
                }
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
});


module.exports = router;