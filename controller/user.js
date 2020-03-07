const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

// 전체 유저를 불러오는 API
exports.user_get = (req, res) => {

    userModel
    .find()
    .exec()
    .then(result => {
        res.json({
            count: result.length,
            userlist: result
        });
    })
    .catch(err => {
        res.json({
            error: err
        })
    })
};

// 회원가입하는 API
exports.user_signup = (req, res) => {

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

};

// 로그인 하는 API
exports.user_login = (req, res) => {
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
                        }, process.env.SCRETKEY, { expiresIn: "1d"});

                        res.json({
                            msg: "로그인 성공",
                            tokenInfo: "bearer " + token
                        });
                    }
                });
            }
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
};

exports.user_update_user = (req, res) => {
    const id = req.params.userID; 
 
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
 
    userModel
     .update({_id: id}, {$set: updateOps})
     .then(() => {
         res.json({
             msg: "updated user profile"
         })
     })
     .catch(err => {
         res.json({
             error: err
         });
     });
 };
 
 exports.user_deleted_user = (req, res) => {
    const id = req.params.userID;

    userModel
    .findByIdAndDelete(id)
    .then(() => {
        res.json({
            msg: "deleted user",
            request: {
                type: "GET",
                url: "http://localhost:2020/user"
            }
        });
    })
    .catch(err => {
        res.json({
            error: err
        });
    })
};