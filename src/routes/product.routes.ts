import { productController } from "../controllers";
import { authMiddleware, imageUpload } from "../middlewares";
import express from "express";

const router = express.Router();

router.post("/",imageUpload.upload().fields([{ name: "productImages" }]),productController.createProduct);
router.get("/", productController.listProduct);
router.get("/admins", productController.listAdminProduct);
router.patch("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export default router;
