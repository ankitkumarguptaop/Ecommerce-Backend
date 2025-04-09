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
const errors_1 = require("../libs/errors");
const repositories_1 = require("../repositories");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, rating, description, stock, price, brand } = payload.body;
    const { id } = payload.user;
    const { productImages } = payload.files;
    const product = yield repositories_1.productRepository.create({ name, rating, description, stock, price, brand, user_id: id });
    if (!product) {
        throw new errors_1.NoContent("product not created");
    }
    const images = productImages.map((image) => {
        return { url: image.path, product_id: product.id, name: image.originalname };
    });
    const productImagesCreated = yield repositories_1.imageRepository.createBulk(images);
    if (!productImagesCreated) {
        throw new errors_1.NoContent("product images not created");
    }
    return product;
});
exports.createProduct = createProduct;
const listProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 5 } = payload.query;
    let offset = 0;
    if (page && limit) {
        offset = limit * (page - 1);
    }
    const products = yield repositories_1.productRepository.findAndCountAll({
        include: ["images"],
        offset: offset,
        limit: limit,
    });
    if (!products) {
        throw new errors_1.NoContent("products not found");
    }
    const count = yield repositories_1.productRepository.count({});
    return Object.assign(Object.assign({}, products), { count: count });
});
exports.listProduct = listProduct;
// exports.listUserProduct = async (payload) => {
//   const { id } = payload.user;
//   const { page = 1, limit = 5 } = payload.query;
//   let offset = 0;
//   if (page && limit) {
//     offset = limit * (page - 1);
//   }
//   const products = await productRepository.findAll({
//     criteria: { user_id: id },
//     include: ["images", "comments", "user_id"],
//     offset: offset,
//     limit: limit,
//   });
//   if (!products) {
//     throw new NoContent("products not found");
//   }
//   const count = await productRepository.count();
//   return products;
// };
// exports.deleteProduct = async (payload) => {
//   const { productId } = payload.params;
//   const { id } = payload.user;
//   const product = await productRepository.findOne({ id: productId });
//   if (!product) {
//     throw new ForBidden("product not found");
//   }
//   if (product.user_id !== id) {
//     throw new UnAuthorized("You are not authorized to delete this product");
//   }
//   await imageRepository.softDelete({ criteria: { product_id: productId } });
//   return await productRepository.softDelete({
//     criteria: { id: id },
//     options: { returning: true },
//   });
// };
// exports.updateproduct = async (payload) => {
//   const { productId } = payload.params;
//   const { id } = payload.user;
//   const product = await productRepository.findOne({ id: productId });
//   if (!product) {
//     throw new ForBidden("product not found");
//   }
//   if (product.user_id !== id) {
//     throw new UnAuthorized("You are not authorized to update this product");
//   }
//   return await productRepository.update({
//     payload: payload.body,
//     criteria: { id: productId },
//     options: { returning: true },
//   });
// };
