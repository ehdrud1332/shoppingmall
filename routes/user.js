const express = require('express');

const router = express.Router();

const {
    user_signup,
    user_login,
    user_get,
    user_update_user,
    user_deleted_user
} = require('../controller/user');
const userModel = require('../models/user');


// 유저를 불러오는 API(관리자용)
router.get('/', user_get);

// 회원가입
// http://localhost:2020/user/signup
router.post('/signup', user_signup);

// 로그인
// http://localhost:2020/uesr/login
router.post('/login', user_login);
// Test 하는 방법 
// 제품등록하는방법 Test : name,price - token 헤더에 삽입 - 토큰을 발행하기 위해 로그인 필요 - 헤더에 토큰넣기
// 제품상세정보를 불러오는 방법 : 제품아이디(url+ 제품아이디 추가) - token 헤더에 삽입 - 토큰을 발행하기 위해 로그인필요 - 헤더에 토큰 넣기
// order 등록하는 방법 : productId가져오기 - product,qty 입력 - token 헤어에 삽입 - 토큰을 발행하기 위해 로그인필요 - 헤더에 토큰넣기
// 수정하는 방법 :
// 삭제하는 방법 :

//유저 프로필 업데이트
router.patch('/:userID', user_update_user);

//회원탈퇴
router.delete('/:userID', user_deleted_user);

module.exports = router;