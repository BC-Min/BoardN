exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) { // 패스포트를 통해서 로그인 여부 확인
        next();
    } else{
        res.status(403).send('로그인 필요');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else{
        const message = encodeURIComponent('로그인한상태입니다');
        res.redirect(`/?error=${message}`); //localhost:8085?error=메시지
    }
}