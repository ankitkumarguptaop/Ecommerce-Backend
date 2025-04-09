"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRepository = exports.productRepository = exports.userRepository = void 0;
const user_repository_1 = __importDefault(require("./user.repository"));
exports.userRepository = user_repository_1.default;
const product_repository_1 = __importDefault(require("./product.repository"));
exports.productRepository = product_repository_1.default;
const image_repository_1 = __importDefault(require("./image.repository"));
exports.imageRepository = image_repository_1.default;
