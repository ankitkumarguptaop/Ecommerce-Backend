import { cartController } from "../controllers";
import { authMiddleware, imageUpload } from "../middlewares";
import express from "express";

const router = express.Router();

router.post( "/",cartController.addToCart);
router.get("/", cartController.listCartItem);
router.patch("/:cartItmeId", cartController.updateCartItemQuantity);
router.delete("/:cartItmeId", cartController.deleteProduct);

export default router;
