import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import {
	COMMENT_REPOSITORY,
	LIKE_REPOSITORY,
	RECIPE_REPOSITORY,
} from 'src/constants/repositories';
import { CommentController } from './controllers/comment.controller';
import { LikeController } from './controllers/like.controller';
import { RecipeController } from './controllers/recipe.controller';
import { CommentRepository } from './repositories/comment.repository';
import { LikeRepository } from './repositories/like.repository';
import { RecipeRepository } from './repositories/recipe.repository';
import { CommentService } from './services/comment.service';
import { LikeService } from './services/like.service';
import { RecipeService } from './services/recipe.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				dest: configService.get('assetsDir') + '/recipe',
				preservePath: true,
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [RecipeController, LikeController, CommentController],
	providers: [
		RecipeService,
		{ provide: RECIPE_REPOSITORY, useClass: RecipeRepository },
		LikeService,
		{ provide: LIKE_REPOSITORY, useClass: LikeRepository },
		CommentService,
		{ provide: COMMENT_REPOSITORY, useClass: CommentRepository },
	],
})
export class RecipeModule {}
