import { Module } from '@nestjs/common';
import { CheckRoles } from 'src/middlewares/CheckRoles/Guard';
import { CommentController } from './controllers/comment.controller';
import { CookbookController } from './controllers/cookbook.controller';
import { LikeController } from './controllers/like.controller';
import { CommentRepository } from './repositories/comment.repository';
import { CookbookRepository } from './repositories/cookbook.repository';
import { LikeRepository } from './repositories/like.repository';
import { CommentService } from './services/comment.service';
import { CookbookService } from './services/cookbook.service';
import { LikeService } from './services/like.service';

@Module({
	imports: [],
	controllers: [CookbookController, LikeController, CommentController],
	providers: [CookbookService, CookbookRepository, 
				LikeService, LikeRepository, 
				CommentService, CommentRepository,
				CheckRoles]
})
export class CookbookModule {}
