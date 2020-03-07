const orderModel = require('../models/order');
const productModel = require('../models/product');


// 전체 order를 상품을 불러오는 API
exports.orders_get_all = (req, res) => {

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
};

// 특정 장바구니를 불러오는 API
exports.orders_get_order = (req, res) => {
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
};

// order를 생성하는 API
exports.orders_create_order = (req, res) => {

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
                        type: "Get",
                        url: "http://localhost:2020/order/"
                    }
                }
            });
        })
        .catch(err => {
            res.json({
                error : err
            });
        })
    
   
};

// 상품을 업데이트 하는 API
exports.orders_update_order = (req, res) => {
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
                    url: "http://localhost:2020/order/" + id
                }
            })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })

};


// 전체 장바구니를 삭제하는 API
exports.orders_delete_all = (req, res) => {

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
};

//특정 장바구니를 삭제하는 API
exports.orders_delete_order = (req, res) => {
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
};

