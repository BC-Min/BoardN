const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize){
        Board.init({
            no:{
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true, // primary key 설정 추가
                autoIncrement: true, // 자동 증가 설정 추가
            },
            title:{
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: false,
            },
            writer:{
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            writedate:{
                type: Sequelize.DATE,
                allowNull: false,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'boarder',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }
    static associate(db) {
        db.Board.belongsTo(db.User, { foreignKey: 'userId' });
    }
}

module.exports = Board;