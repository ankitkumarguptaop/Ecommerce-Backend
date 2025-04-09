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
import { User } from "./user";

export class cart  extends Model<
  InferAttributes<cart>,
  InferCreationAttributes<cart>
> {
  declare id: CreationOptional<number>;
  declare user_id: ForeignKey<User["id"]>;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static associate(models: any) {
    cart.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    cart.hasMany(models.cartItem, {
      foreignKey: "cart_id",
      as: "cartItems",
    });
  }
}

export const initCartModel = (sequelize: Sequelize) => {
  cart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      user_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users", 
          key: "id",
        },
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
      modelName: "carts",
      tableName: "carts",
      timestamps: true,
      paranoid: true,
    }
  );
};
