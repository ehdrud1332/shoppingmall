const userModel = require('../models/user');

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