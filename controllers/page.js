//각 명칭에 맞는 페이지로 랜더링
exports.renderProfile = (req,res,next) =>{
    res.render('profile', {title: '내 정보 - BoardN_member'});
};
exports.renderJoin = (req,res,next) =>{
    res.render('join', {title: '회원가입 - BoardN_Join'});
};
exports.renderMain = (req,res,next) =>{
    res.render('main', {
        title: 'BoardN_Main',
        twits:[],
    });
};

//라우터 -> 컨트롤러 -> 서비스