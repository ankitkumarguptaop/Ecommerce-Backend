import express, { Router } from "express";
import { authMiddleware } from "../middlewares";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import cartRoutes from "./cart.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware.jwtTokenValidation, userRoutes);
router.use("/products", authMiddleware.jwtTokenValidation, productRoutes);
router.use("/carts", authMiddleware.jwtTokenValidation, cartRoutes);

export default router;
