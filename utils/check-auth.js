const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //try. catch 연습하자
    try {
        const token = req.headers.authorization.split(" ")[1]; //사용자 헤더입력값을 토큰이라고 상수화하고
        //token 값을 검증하는것을 decoded라고 상수화시킴
        const decoded = jwt.verify(token, "secret");
        // decoded값을 사용자 userData에 저장한다.
        req.userData = decoded;
        next();

    } catch (error) {
        res.json({
            msg : 'auth failed'
        })

    }
};