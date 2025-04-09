"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    // Method to compare passwords
    matchPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcryptjs_1.default.compare(password, this.password);
        });
    }
    static associate(models) {
        // Define associations here
    }
}
exports.User = User;
const initUserModel = (sequelize) => {
    User.init({
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
                    args: [3, 30],
                    msg: "name length should lie between 3 to 30",
                },
            },
        },
        email: {
            allowNull: false,
            unique: true,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "invalid email format",
                },
            },
        },
        profile_image: {
            allowNull: false,
            unique: true,
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 30],
                    msg: "password length should lie between 6 to 30",
                },
            },
        },
        role: {
            allowNull: false,
            type: sequelize_1.DataTypes.ENUM("normal", "admin"),
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
        modelName: "User",
        tableName: "Users",
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
                const salt = yield bcryptjs_1.default.genSalt(10);
                user.password = yield bcryptjs_1.default.hash(user.password, salt);
            }),
            beforeUpdate: (user) => __awaiter(void 0, void 0, void 0, function* () {
                if (user.changed("password")) {
                    const salt = yield bcryptjs_1.default.genSalt(10);
                    user.password = yield bcryptjs_1.default.hash(user.password, salt);
                }
            }),
        },
    });
};
exports.initUserModel = initUserModel;
