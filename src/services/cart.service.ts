import { BadRequest, ForBidden } from "../libs/errors";
import { cartItem, product } from "../models";
import { cartItemRepository, cartRepository } from "../repositories";

export const addToCart = async (payload: any) => {
  const { productId, cartId, quantity } = payload.body;
  const cart: any = await cartRepository.findOne({ id: cartId });

  if (!cart) {
    throw new ForBidden("cart not found to add product ");
  }

  const isProductItemAlredyPresent: any = await cartItemRepository.findOne({
    product_id: productId,
    cart_id: cartId,
  });

  console.log(isProductItemAlredyPresent);

  let addedItem = undefined;

  if (!isProductItemAlredyPresent) {
    addedItem = await cartItemRepository.create({
      product_id: productId,
      cart_id: cartId,
      quantity: parseInt(quantity),
    });
  } else {
    addedItem = await cartItemRepository.update({
      payload: {
        quantity:
          parseInt(quantity) + parseInt(isProductItemAlredyPresent.quantity),
      },
      criteria: { product_id: productId },
      options: { returning: true },
    });
  }
  return addedItem;
};


export const deleteCartItem = async (payload: any) => {
  const { cartItmeId } = payload.params;
  if (!cartItmeId) {
    throw new BadRequest("cartItme id not given ");
  }
  const cartItem: any = await cartItemRepository.findOne({ id: cartItmeId });
  if (!cartItem) {
    throw new ForBidden("cartItem not found");
  }
  return await cartItemRepository.softDelete({ criteria: { id: cartItmeId } });
};


export const updateCartItemQuantity = async (payload: any) => {
  const { quantity, cartItmeId } = payload.body;

  const cartItem: any = await cartItemRepository.findOne({ id: cartItmeId });
  if (!cartItem) {
    throw new ForBidden("cartItem not found");
  }

  const newProductItmes = await cartItemRepository.update({
    payload: { quantity: quantity },
    criteria: { id: cartItmeId },
    options: { returning: true },
  });
  return newProductItmes;
};


export const listCartItem = async (payload: any) => {
  const { id } = payload.user;
  const { page = 1, limit = 5 } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  const allCartItems = await cartRepository.findAndCountAll({
    criteria: { user_id: id },
    include: [
      {
        model: cartItem,
        as: "cartItems",
        include: [
          {
            model: product,
            as: "product",
            include: ["product_images"],
          },
        ],
      },
    ],
    offset: offset,
    limit: limit,
  });
  return allCartItems;
};
