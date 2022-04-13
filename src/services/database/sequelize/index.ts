import models from './models';
import { sequelize } from './sequelize';


sequelize.sync()
.then( async () => {
    console.log('synchronized');
});

export { models };

