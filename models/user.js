const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    //회원정보 만들기
    //initiate(모델의 정보 입력하는)
    static initiate(sequelize){
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local','kakao'),
                //ENUM은 사람들이 자유롭게 입력하는 것을 어느정도 제한함
                allowNull: false,
                defaultValue: 'local'
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        },{
            sequelize,
            timestamps: true, // createAt, updateAt의 정보를 자동으로 기록해줌
            underscored: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: true, //deleteAt 기록(유저삭제시) db복구시 찾을때 유용, 삭제일이 기록되어있으면 삭제로 인지함
            charset: 'utf8mb4',//이모티콘 사용하겠다 => mb4
            collate: 'utf8mb4_general_ci',
        })
    }
    //associate(테이블 관계 입력하는)
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, { // 팔로워
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow'
        })
        db.User.belongsToMany(db.User, { // 팔로잉
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        })
    }
}

module.exports = User;