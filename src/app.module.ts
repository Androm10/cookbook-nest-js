import { Module } from '@nestjs/common';
import { CookbookModule } from './modules/cookbook/cookbook.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './services/config';
import { CheckRoles } from './middlewares/CheckRoles/Guard';

console.log(`.${process.env.NODE_ENVIRONMENT}.env`);


@Module({
	imports: [CookbookModule, 
		RecipeModule,
		UserModule, 
		AuthModule,
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true
		})
	],
	providers: [CheckRoles],
	controllers: [],
})
export class AppModule {}



// {
// 	provide: APP_GUARD,
// 	useClass: isAdmin,
// }