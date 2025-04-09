"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", middlewares_1.imageUpload.upload().fields([{ name: "productImages" }]), controllers_1.productController.createProduct);
router.get("/", controllers_1.productController.listProduct);
exports.default = router;
