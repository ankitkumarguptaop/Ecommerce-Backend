import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initProductModel, product } from './product';
import { initImageModel ,image } from './image';
import configObj from '../configs/dbconfig';

const config = configObj['development'];

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password ?? undefined,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

// Initialize models
initUserModel(sequelize);
initProductModel(sequelize);
initImageModel(sequelize);

// Call associate methods if needed
User.associate?.({});
product.associate?.({});
image.associate?.({product});

export { sequelize, User  ,product ,image};
