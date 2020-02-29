const express = require('express');
const bcrypt = require('bcryptjs');
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