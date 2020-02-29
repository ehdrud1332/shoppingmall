const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// 유저를 불러오는 API(관리자용)
router.get('/', (req, res) => {
    res.json({
        msg : "유저를 불러옴"
    });
});


// 회원가입
// http://localhost:2020/user/signup
router.post('/signup', (req, res) => {
    res.json({
        msg : "유저를 생성함"
    });
});

// 로그인
// http://localhost:2020/uesr/login
router.post('/login', (req, res) => {
    
});





//유저 프로필 업데이트
router.patch('/', (req, res) => {
    res.json({
        msg : "유저를 수정함"
    });
});

//회원탈퇴
router.delete('/', (req, res) => {
    res.json({
        msg : "유저를 삭제함"
    
    });
});

module.exports = router;