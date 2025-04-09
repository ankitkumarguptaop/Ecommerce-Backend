import { Request, Response, NextFunction } from "express";
import { OK } from "../libs/constants";
import { cartService } from "../services";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await cartService.addToCart({
      body: req.body,
      user: req.user,
    });

    res.status(OK).json({
      message: "Successfully add item in  cart",
      cart: response,
    });
  } catch (error: any) {
    console.error("Failed to add item in cart:", error.message);
    next(error);
  }
};

export const listCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await cartService.listCartItem({
      body: req.body,
      query: req.query,
      user: req.user,
    });

    res.status(OK).json({
      message: "Successfully listed  cart",
      cart: response,
    });
  } catch (error: any) {
    console.error("Failed to  list  cart:", error.message);
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await cartService.deleteCartItem({
      body: req.body,
      params: req.params,
      user: req.user,
    });

    res.status(OK).json({
      message: "Successfully deleted  cart",
      cart: response,
    });
  } catch (error: any) {
    console.error("Failed to  deleted  cart:", error.message);
    next(error);
  }
};

export const updateCartItemQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await cartService.updateCartItemQuantity({
      body: req.body,
      params: req.params,
      user: req.user,
    });

    res.status(OK).json({
      message: "Successfully updated  cart",
      cart: response,
    });
  } catch (error: any) {
    console.error("Failed to  updated  cart:", error.message);
    next(error);
  }
};
