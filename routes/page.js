const express = require('express');
const router = express.Router();
const {renderJoin, renderMain, renderProfile, renderBoard } = require('../controllers/page');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

router.use((req,res,next) => {
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    //로그아웃 하기전 까지는 req.session 에서 공유됨
    // req.session.data = '123';
    next();
})

//미들웨어폴더에서 작성한 로그인 여부를 통한 권한부여
router.get('/main', isLoggedIn, renderMain);
router.get('/board', isLoggedIn, renderBoard);
router.get('/profile', isLoggedIn , renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/',renderMain);

module.exports = router;