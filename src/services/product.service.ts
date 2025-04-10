import { Sequelize, Op, } from "sequelize";
import { ForBidden, NoContent, UnAuthorized } from "../libs/errors";
import { imageRepository, productRepository } from "../repositories";

export const createProduct = async (payload: any) => {
  const { name, rating, description, stock, price, brand } = payload.body;

  const { id } = payload.user;

  const { productImages } = payload.files;

  const product = await productRepository.create({
    name,
    rating,
    description,
    stock,
    price,
    brand,
    user_id: id,
  });

  if (!product) {
    throw new NoContent("product not created");
  }

  const images = productImages.map((image: any) => {
    return {
      url: image.path,
      product_id: product.id,
      name: image.originalname,
    };
  });

  const productImagesCreated = await imageRepository.createBulk(images);

  if (!productImagesCreated) {
    throw new NoContent("product images not created");
  }
  return product;
};

export const listProduct = async (payload: any) => {
  const { page = 1, limit = 5, search } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  let whereObj: any = {};

  if (search) {
    whereObj[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
    ];
  }
  const products = await productRepository.findAndCountAll({
    criteria: whereObj,
    include: ["product_images"],
    offset: offset,
    limit: limit,
  });
  if (!products) {
    throw new NoContent("products not found");
  }
  const count = await productRepository.count({});
  return { ...products, count: count };
};

export const listAdminProduct = async (payload: any) => {
  const { id } = payload.user;
  const { page = 1, limit = 5, search } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }

  const products = await productRepository.findAndCountAll({
    criteria: { user_id: id },
    include: ["product_images"],
    offset: offset,
    limit: limit,
  });
  if (!products) {
    throw new NoContent("products not found");
  }
  return products;
};

export const deleteProduct = async (payload: any) => {
  const { productId } = payload.params;
  const { id } = payload.user;
  const product = await productRepository.findOne({ id: productId });

  if (!product) {
    throw new ForBidden("product not found");
  }

  await imageRepository.softDelete({ criteria: { product_id: productId } });

  return await productRepository.softDelete({
    criteria: { id: id },
    options: { returning: true },
  });
};

export const  updateProduct = async (payload: any) => {
  const { productId } = payload.params;
  const { id } = payload.user;
   console.log('✌️payload.body --->', payload.body);
  const product: any = await productRepository.findOne({ id: productId });
  if (!product) {
    throw new ForBidden("product not found");
  }

  if (product.user_id !== id) {
    throw new UnAuthorized("You are not authorized to update this product");
  }
  const newProduct = await productRepository.update({
    payload: payload.body,
    criteria: { id: productId },
    options: { returning: true },
  });
  console.log("✌️newProduct --->", newProduct);
  return newProduct;
};
