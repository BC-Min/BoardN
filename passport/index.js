const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => { //다른파일에서 사용되는 exUser가 여기서 나옴.
        //auth.js에서 req.login()으로 호출되면 이쪽으로 넘어와서 user에 있는 user.id만 저장함.
        done(null, user.id); // 세션 => {세션쿠키 : 유저아이디}형식으로 메모리에 저장됨. user로 저장해도 되지만 전체를 저장하는 것이다 보니 메모리과부하 걸려 서버가 터짐.
        //여기서 저장 된 정보는 app.js session으로 넘어감.
    });
    passport.deserializeUser((id, done) => {
        User.findOne({where : {id}})
            .then((user) => done(null,user)) // req.user / req.session
            .catch(err => done(err));
    });

    //routes/auth.js 에서 'local'이 있으므로 이쪽으로 와서 local()을 호출함.
    local()
    kakao();
};