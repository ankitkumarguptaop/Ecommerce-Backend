
import { Model } from "sequelize";
import { cart } from '../models'; 

import {BaseRepository} from "./base.repository";
class CartRepository extends BaseRepository< Model> {
  
  constructor({ model }:any ) {
    super({ model });
  }
}
export default new CartRepository({ model: cart });
