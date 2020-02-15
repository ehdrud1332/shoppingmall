const express = require('express');
const router = express.Router();

// 장바구니를 불러오는 API
router.get('/', (req, res) => {
    res.json({
        msg : "장바구니를 불러옴"
    });
});

// 장바구니를 생성하는 API
router.post('/', (req, res) => {
    res.json({
        msg : "장바구니를 생성함"
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