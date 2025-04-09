"use strict";

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  CreationOptional,
  ForeignKey,
} from "sequelize";

import { cart } from "./cart";
import { product } from "./product";

export class cartItem  extends Model<
  InferAttributes<cartItem>,
  InferCreationAttributes<cartItem>
> {
  declare id: CreationOptional<number>;
  declare product_id: ForeignKey<product["id"]>;
  declare cart_id: ForeignKey<cart["id"]>;
  declare quantity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static associate(models: any) {
    cartItem.belongsTo(models.product, {
      foreignKey: "product_id",
      as: "product",
    });
    cartItem.belongsTo(models.cart, {
      foreignKey: "cart_id",
      as: "cart",
    });
  }
}

export const initCartItemModel = (sequelize: Sequelize) => {
  cartItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      product_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "products", 
          key: "id",
        },
      },
      cart_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "carts", 
          key: "id",
        },
      },
      quantity:{
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },

    },
    {
      sequelize,
      modelName: "cartItems",
      tableName: "cartItems",
      timestamps: true,
      paranoid: true,
    }
  );
};
