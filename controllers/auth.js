const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.join = async (req, res, next) => {
    //프론트에서 회원가입 요청이 오면 해당 데이터를 이쪽으로 넘김.
    const {nick, email, password} = req.body; // app.js에서 req.body를 가져옴.
    try{
        const exUser = await User.findOne({where: {email}});
        if(exUser) {
            return res.redirect('/join/error-exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/'); //성공시 302코드가 나옴.
    }catch(error){
        console.error(error);
        next(error);
    }
}

//POST /auth/login
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => { //localStrategy에서 done이 실행 되면 이쪽으로 옴.
        if(authError) { // 서버실패
            console.error(authError);
            return next(authError);
        }
        if(!user){ // 로직실패
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => { // 로그인 성공
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req, res, next);
}
exports.logout = (req, res, next) => { // { } 브라우저 connect.sid 가 남아있어도 {}안이 지워져서 로그인이 안됨. 세션객체가 지워졌기 때문.
    req.logout(() => {
        res.redirect('/');
    })
};