import { Module } from '@nestjs/common';
import { CookbookModule } from './modules/cookbook/cookbook.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { isAdmin } from './middlewares/isAdmin/Guard';

@Module({
	imports: [CookbookModule, RecipeModule, UserModule, AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule {}



// {
// 	provide: APP_GUARD,
// 	useClass: isAdmin,
// }