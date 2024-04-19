//import 개념
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

//env파일 적용
dotenv.config();
//dotenv.config 가 실행 되야 process.env.COOKIE_SECRET이 가능
//routes 연결
const pageRouter = require('./routes/page');
const exp = require('constants');

//express실행
const app = express();

//port연결
app.set('port', process.env.PORT || 8001);

//view 설정
app.set('view engine    ', 'html');

// nunjucks를 통해서 랜더링을 함.
nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev')) // 배포시 combined로 변경
app.use(express.static(path.join(__dirname, 'public')));//public을 static으로 변경
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use('/', pageRouter);

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