const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const Usser = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        //auth.js에서 req.login()으로 호출되면 이쪽으로 넘어와서 user에 있는 user.id만 저장함.
        done(null, user.id);
        //여기서 저장 된 정보는 app.js session으로 넘어감.
    });
    passport.deserializeUser((id,done) => {
        User.findOne( {where : {id}})
            .then((user) => done(nul,user))
            .catch(err => done(err));
    });

    //routes/auth.js 에서 'local'이 있으므로 이쪽으로 와서 local()을 호출함.
    local()
};