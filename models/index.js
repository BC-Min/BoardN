// MODEL 자동화 후 파일
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];// db연결에 대한 설정을 불러옴
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);
db.sequelize = sequelize;

const basename = path.basename(__filename);
fs.readdirSync(__dirname) // 폴더위치 찾는 코드
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'; // index.js .파일 .js 제외
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach(modelName => {
  console.log(db, modelName, "=====================Object.key(db)");
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
})
module.exports = db;

// config/config.json 작성 완료 후 npx sequelize db:create 로 db생성가능