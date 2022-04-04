import { Module } from '@nestjs/common';
import { RecipeController } from './controllers/recipe.controller';
import { RecipeRepository } from './repositories/recipe.repository';
import { RecipeService } from './services/recipe.service';

@Module({
	controllers: [RecipeController],
	providers: [RecipeService, RecipeRepository]
})
export class RecipeModule {}
