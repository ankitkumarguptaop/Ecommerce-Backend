"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const base_repository_1 = require("./base.repository");
class ProductRepository extends base_repository_1.BaseRepository {
    constructor({ model }) {
        super({ model });
    }
}
exports.default = new ProductRepository({ model: models_1.product });
