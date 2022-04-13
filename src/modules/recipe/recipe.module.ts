import { Module } from '@nestjs/common';
import { COMMENT_REPOSITORY, LIKE_REPOSITORY, RECIPE_REPOSITORY } from 'src/constants/repositories';
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
	controllers: [RecipeController, LikeController, CommentController],
	providers: [RecipeService, { provide: RECIPE_REPOSITORY, useClass: RecipeRepository },
				LikeService, { provide: LIKE_REPOSITORY, useClass: LikeRepository },
				CommentService, { provide: COMMENT_REPOSITORY, useClass: CommentRepository }]
})
export class RecipeModule {}
