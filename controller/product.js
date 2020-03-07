const productModel = require('../models/product');

// product 전체 데이터 불러오기
exports.products_get_all = (req, res) => {


    productModel
        .find()
        .exec()
        .then(docs => {
            // res.json({
            //     count: docs.length,
            //     products: docs
            // })
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return{
                        name : doc.name,
                        price : doc.price,
                        id : doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:2020/product/" + doc._id
                            
                        }
            

                    }
                })
            }
            res.json(response)


        })
        .catch(err => {
            res.json({
                error : err
            });
        });


    // res.json({
    //     msg : "상품을 불러왔다"
    // });
};

//특정 상품을 불러오는 API
exports.products_get_product = (req, res) => {
    const id = req.params.productID;

    productModel
        .findById(id)
        .exec()
        .then(doc => {
            if(doc){
                return res.json({
                    productInfo: {
                        name : doc.name,
                        price: doc.price,
                        id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:2020/product"
                        }
                    }
                });
              

            } else{
                 res.json({
                    msg : "productid is not found"
                });
            }
        
        })
        .catch(err => {
            res.json({
                error : err
            });
        });

};

// 상품을 생성힘
exports.products_create_product = (req, res) => {

    const product = new productModel ({
        name : req.body.name,
        price : req.body.price
    });
    product
        .save()
        .then(result => {
            res.json({
                message: "created product",
                createdproduct : {
                    name: result.name,
                    price:result.price,
                    id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:2020/product/"
                    }
                }
            })
        })
        .catch(err => {
            res.json({
                error : err
            })
        });
};

// 상품을 수정 하는 API

exports.products_update_product = (req, res) => {

    const id = req.params.productID;
        
    const updateOps = {};   
    for(const ops of req.body) {
        updateOps[ops.propName]= ops.value;
    }

    productModel
        .update({_id: id}, {$set: updateOps})
        .then(result => {
            res.json({
                msg : "updated product",
                request: {
                    type: "GET",
                    url: "http://localhost:2020/product/"+id

                }
            });
        })
        .catch(err => {
            res.json({
                msg : err
            });
        });
};

// 상품을 삭제하는 API

exports.products_delete_product = (req, res) => {
    const id = req.params.productID;
    
    productModel
        .findByIdAndRemove(id)
        .then(result => {
            res.json({
                msg: "deleted product",
                request: {
                   type: "GET",
                   url: "http://localhost:2020/product" 
                }
            });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
};

// 상품을 전체 삭제
exports.product_delete_all = (req, res) => {
    productModel
        .deleteMany()
        .then()
        .catch()
};