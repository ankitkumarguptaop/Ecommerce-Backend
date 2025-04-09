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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProduct = exports.createProduct = void 0;
const constants_1 = require("../libs/constants");
const services_1 = require("../services");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield services_1.productService.createProduct({
            body: req.body,
            files: req.files,
            user: req.user
        });
        res.status(constants_1.OK).json({
            message: "Successfully created user",
            product: response,
        });
    }
    catch (error) {
        console.error("Failed to create user:", error.message);
        next(error);
    }
});
exports.createProduct = createProduct;
const listProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield services_1.productService.listProduct({
            body: req.body,
            query: req.query
        });
        res.status(constants_1.OK).json({
            message: "Successfully listed  products",
            product: response,
        });
    }
    catch (error) {
        console.error("Failed to  list  products:", error.message);
        next(error);
    }
});
exports.listProduct = listProduct;
