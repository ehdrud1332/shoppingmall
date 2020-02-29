const express = require('express');
const router = express.Router();

// ..은 완전히 다른폴더 불러올시 사용
const productModel = require('../models/product');




// 전체상품 불러오는 API
router.get('/', (req, res) => {


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
});


// 상세상품을 불러오는 API
router.get('/:productID', (req, res) => {
    const id = req.params.productID

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

});




// 상품 생성하는 API
router.post('/', (req, res) => {


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






//   res.json({
//         msg : "상품을 생성함",
//         productInfo: product  



//     });
});




// 상품을 수정함
router.patch('/:productID', (req, res) => {

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
});






// 상품을 삭제함
router.delete('/:productID', (req, res) => {
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
});












module.exports = router;

