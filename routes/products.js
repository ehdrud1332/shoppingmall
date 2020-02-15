const express = require('express');
const router = express.Router();

// 상품 불러오는 API
router.get('/', (req, res) => {
    res.json({
        msg : "상품을 불러왔다"
    });
});
// 상품 생성하는 API
router.post('/', (req, res) => {


    const product = {
        title : req.body.title,
        desc : req.body.desc,
        price : req.body.price
    
    }


    res.json({
        msg : "상품을 생성함",
        productInfo: product



    });
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

