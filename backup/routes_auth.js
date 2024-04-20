const express = require('express');
const router = express.Router();
const passport = require('passport');

//router.post('/auth/login', passport.authenticate('local')); //인증 방식이 local인지 검증함.
// 여기서 'local'이 있으므로 passport/index.js로 이동

router.post('/auth/login', passport.authenticate('local'), () => {
    req.login(); // 검증 성공했으면 req.login을 호출함. passport/index.js로 이동
});

module.exports = router;

// 현재 이해한거 => routes의 역할은 Springboot로 치면 controller에서 값을 정리해서 특정 페이지로 이동하는 것