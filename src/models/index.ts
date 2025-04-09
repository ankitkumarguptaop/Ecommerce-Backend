import { Sequelize } from 'sequelize';
import { initUserModel, User } from './user';
import { initProductModel, product } from './product';
import { initImageModel ,image } from './image';
import { initCartModel ,cart } from './cart';
import { initCartItemModel ,cartItem } from './cartitem';
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
initCartModel(sequelize);
initCartItemModel(sequelize)
// Call associate methods if needed
User.associate?.({cart});
product.associate?.({image,User});
image.associate?.({product});
cart.associate?.({User ,cartItem});
cartItem.associate?.({product ,cart});

export { sequelize, User  ,product ,image ,cart,cartItem};
