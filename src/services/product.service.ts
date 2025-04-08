import { NoContent } from "../libs/errors";
import { image } from "../models";
import { imageRepository, productRepository } from "../repositories";






export const createProduct = async (payload: any) => {
  const { name,rating ,description , stock, price, brand } = payload.body;
 
  const { id } = payload.user;

  const { productImages } = payload.files;

  const product = await productRepository.create({name,rating ,description , stock, price, brand ,user_id:id });

    if (!product) {
      throw new NoContent("product not created");
    }

    const images = productImages.map((image:any) => {
      return { url: image.path, product_id: product.id ,name:image.originalname };
    });

    const productImagesCreated = await imageRepository.createBulk(images);

    if (!productImagesCreated) {
      throw new NoContent("product images not created");
    }
    return product;

};

exports.listProduct = async (payload:any) => {
  const { page = 1, limit = 5 } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  const products = await productRepository.findAndCountAll({
    include: ["images"],
    offset: offset,
    limit: limit,
  });
  if (!products) {
    throw new NoContent("products not found");
  }
  const count = await productRepository.count({});
  return { ...products, count: count };
};

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
