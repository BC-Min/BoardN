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
exports.login = () => {

}
exports.logout = () => {

}