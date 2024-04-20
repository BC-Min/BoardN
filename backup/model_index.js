// // MODEL 자동화 전 파일
// const Sequelize = require('sequelize');
// const User = require('./user');
// const Post = require('./post');
// const Hashtag = require('./hashtag');
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];// db연결에 대한 설정을 불러옴
// const db = {};
// const sequelize = new Sequelize(
//   config.database, config.username, config.password, config,
// ); // 연결한게 아님. 연결하기 위해 만들어 둔 상황 app.js에서 연결 할예정
// db.sequelize = sequelize;
// //시퀄라이즈 연결 => db로 묶어둠 => 재사용용이
// db.User = User;
// db.Post = Post;
// db.Hashtag = Hashtag;

// User.initiate(sequelize);
// Post.initiate(sequelize);
// Hashtag.initiate(sequelize);

// User.associate(db);
// Post.associate(db);
// Hashtag.associate(db);
// //모델들 작성한거 호출함.


// module.exports = db;