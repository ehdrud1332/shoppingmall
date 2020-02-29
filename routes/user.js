const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

    // 데이터베이스에 email 유무체크 - 패스워드암호화 - 데이터베이스 저장 - 화면에출력
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(user) {
                return res.json({
                    msg: "mail exists"
                });
            } else {
                // password 암호화
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                        
                    if(err) {
                        // 패스워드 암호화 실패시 나타남
                        return res.json({
                            error: err
                        });
                    } else {
                        // 패스워드 암호와 성공시 처리 내용
                        const user = new userModel({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(user => {
                                res.json({
                                    msg: "resigisted user",
                                    userInfo: user
                                })
                            })
                            .catch(err => {
                                res.json({
                                    error : err
                                });
                            });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                error: err
            });
        })

});

// 로그인
// http://localhost:2020/uesr/login
router.post('/login', (req, res) => {
    // 데이터베이스에 이메일이 있는지 체크 - 패스워드가 맞는지 매칭 - jwt을 출력
    userModel
        .findOne({email: req.body.email})
        .then(user => {
            if(!user) {
                return res.json({
                    msg: "이메일이 없음"
                })
            // 패스워드가ㅣ 맞는지 매칭
            // compare 함수를 사용해서 데이터베이스의 패스워드와 사용자의 패스워드의 일치여부 확인
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) {
                        return res.json({
                            msg: "패스워드가 틀림"
                        });
                    } else {

                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        }, "secret", { expiresIn: "1d"});

                        res.json({
                            msg: "로그인 성공",
                            tokenInfo: "bearer " + token
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});
// Test 하는 방법 
// 제품등록하는방법 Test : name,price - token 헤더에 삽입 - 토큰을 발행하기 위해 로그인 필요 - 헤더에 토큰넣기
// 제품상세정보를 불러오는 방법 : 제품아이디(url+ 제품아이디 추가) - token 헤더에 삽입 - 토큰을 발행하기 위해 로그인필요 - 헤더에 토큰 넣기
// order 등록하는 방법 : productId가져오기 - product,qty 입력 - token 헤어에 삽입 - 토큰을 발행하기 위해 로그인필요 - 헤더에 토큰넣기
// 수정하는 방법 :
// 삭제하는 방법 :



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