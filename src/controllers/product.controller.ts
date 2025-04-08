import { Request, Response, NextFunction } from "express";
import { OK } from "../libs/constants";
import { productService } from "../services";

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try {
    const response = await productService.createProduct({
      body: req.body,
      files: req.files,
      user:  req.user
    });

    res.status(OK).json({
      message: "Successfully created user",
      product: response,
    });
  } catch (error: any) {
    console.error("Failed to create user:", error.message);
    next(error);
  }
};

