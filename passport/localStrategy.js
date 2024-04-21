const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// passport/index.js에서 호출된 local 로 인해 여기서 로그인을 시켜도 되는지 검증함.
module.exports = () => {
    //이 안에서 검증이 성공하면 다시 routes/auth.js 로 돌아감.

    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password', // req.body.password
        passReqToCallback: false
    }, async (email, password, done) => { // done(서버실패, 성공유저, 로직실패)
        try{
            const exUser = await User.findOne({ where: { email }});
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result) {
                    done(null, exUser);
                } else{
                    done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                }
            } else{
                done(null, false, {message:'가입되지 않은 회원입니다'});
            }
            //done 이 호출 되면 controllers/auth.js 에 exports.login authError로 감.
        }catch(error){
            console.error(error);
            done(error);
        }
    }))
}