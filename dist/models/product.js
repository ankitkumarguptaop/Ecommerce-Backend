"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProductModel = exports.product = void 0;
const sequelize_1 = require("sequelize");
class product extends sequelize_1.Model {
    static associate(models) {
    }
}
exports.product = product;
const initProductModel = (sequelize) => {
    product.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "name length should lie between 3 to 30",
                },
            },
        },
        price: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            validate: {
                min: 1
            },
        },
        rating: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
        },
        description: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                len: {
                    args: [10, 1000],
                    msg: "description  length should lie between 10 to 100",
                },
            },
        },
        brand: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                len: {
                    args: [3, 1000],
                    msg: "description  length should lie between 10 to 100",
                },
            },
        },
        stock: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            validate: {
                min: 1,
            },
        },
        user_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "Users",
                key: "id",
            },
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: "products",
        tableName: "products",
        timestamps: true,
        paranoid: true,
    });
};
exports.initProductModel = initProductModel;
