
import { Model } from "sequelize";
import { cartItem } from '../models'; 

import {BaseRepository} from "./base.repository";
class CartItemRepository extends BaseRepository< Model> {
  
  constructor({ model }:any ) {
    super({ model });
  }
}
export default new CartItemRepository({ model: cartItem });
