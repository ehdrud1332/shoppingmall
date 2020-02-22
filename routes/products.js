const express = require('express');
const router = express.Router();

// ..은 완전히 다른폴더 불러올시 사용
const productModel = require('../models/product');

// 상품 불러오는 API
router.get('/', (req, res) => {
    res.json({
        msg : "상품을 불러왔다"
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
                createdproduct : result
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
router.patch('/', (req, res) => {
    res.json({
        msg : "상품을 수정함"
    });
});

// 상품을 삭제함
router.delete('/', (req, res) => {
    res.json({
        msg : "상품을 삭제함"
    });
});












module.exports = router;

