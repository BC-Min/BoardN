//import 개념
const express = require('express');
const cookieParser = require('cookie-parser'); // {connect.sid: 쿠키세션} / 을 객체로 만들어줌.
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const { sequelize } = require('./models');

//env파일 적용
dotenv.config();
//dotenv.config 가 실행 되야 process.env.COOKIE_SECRET이 가능
//routes 연결
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const passportConfig = require('./passport');

//express실행
const app = express();

//passport설정
passportConfig();

//port연결
app.set('port', process.env.PORT || 8085);

//view 설정
app.set('view engine', 'html');

// nunjucks를 통해서 랜더링을 함.
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({ force: false }) //sync를 해야 연결이 됨. force:true시 테이블이 지워졌다가 다시 생성되므로 개발시에는 유용하나 배포시에는 false로 해야됨
    .then(() => {
        console.log('데이터베이스 연결 성공')
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev')) // 배포시 combined로 변경
app.use(express.static(path.join(__dirname, 'public')));//public을 static으로 변경
app.use('/img', express.static(path.join(__dirname, 'uploads')));//이미지를 가져옴.
app.use(express.json()); // req.body를 ajax json요청으로
app.use(express.urlencoded({ extended: false })); // req.body 폼으로부터 
app.use(cookieParser(process.env.COOKIE_SECRET));

// passport/index.js => serializeUser 에서 저장된 정보를 여기로 가져옴.
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

//passport는 반드시 express.session 밑에 작성해야함
app.use(passport.initialize()); // 여기서 req.user, req.login, req.isAuthenticate, req.logout 이 생김.
app.use(passport.session());
// 세션으로 저장하는데 connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송되면서 로그인이 완료됨.
// 브라우저 connect.sid=세션쿠키 로 저장됨. 이게 서버로 가는거고 cookieParser가 확인함.

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter)

//404에러처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 에러로그를 서비스한테 넘김.
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
})