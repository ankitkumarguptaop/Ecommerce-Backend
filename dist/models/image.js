"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initImageModel = exports.image = void 0;
const sequelize_1 = require("sequelize");
class image extends sequelize_1.Model {
    static associate(models) {
        image.belongsTo(models.product, {
            foreignKey: "product_id",
            as: "product_image",
        });
    }
}
exports.image = image;
const initImageModel = (sequelize) => {
    image.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        url: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        product_id: {
            allowNull: false,
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "products",
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
        modelName: "images",
        tableName: "images",
        timestamps: true,
        paranoid: true,
    });
};
exports.initImageModel = initImageModel;
