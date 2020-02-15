const express = require('express');
const router = express.Router();

// 유저를 불러오는 API
router.get('/', (req, res) => {
    res.json({
        msg : "유저를 불러옴"
    });
});

//유저를 생성하는 API
router.post('/', (req, res) => {
    res.json({
        msg : "유저를 생성함"
    });
});

//유저를 수정하는 API
router.patch('/', (req, res) => {
    res.json({
        msg : "유저를 수정함"
    });
});

//유저를 삭제하는 API
router.delete('/', (req, res) => {
    res.json({
        msg : "유저를 삭제함"
    
    });
});

module.exports = router;