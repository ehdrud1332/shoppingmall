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
    res.json({
        msg : "상품을 생성함"
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

