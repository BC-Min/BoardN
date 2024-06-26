const Post = require('../models/post');
const User = require('../models/user');
const Board = require('../models/board');

//각 명칭에 맞는 페이지로 랜더링
exports.renderProfile = (req,res,next) =>{
    res.render('profile', {title: '내 정보 - BoardN_member'});
};
exports.renderJoin = (req,res,next) =>{
    res.render('join', {title: '회원가입 - BoardN_Join'});
};
exports.renderBoard = async (req,res,next) =>{
    try{
        const boarder = await Board.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order:[['writedate','DESC']]
        })
    res.render('board', {
        title: 'BoardN_board',
        twits: boarder,
    });
    }catch(error){
        console.error(error);
        next(error);
    }
};
exports.renderMain = async (req,res,next) =>{
    try{
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id','nick'],
            },
            order:[['createdAt','DESC']]
        })
    res.render('main', {
        title: 'BoardN_Main',
        twits: posts,
    });
    }catch(error){
        console.error(error);
        next(error);
    }

};

//라우터 -> 컨트롤러 -> 서비스