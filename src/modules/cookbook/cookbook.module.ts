import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { COMMENT_REPOSITORY, COOKBOOK_REPOSITORY, LIKE_REPOSITORY } from 'src/constants/repositories';
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
	imports: [MulterModule.registerAsync({
		useFactory : async (configService : ConfigService) => ({
			dest : configService.get('assetsDir') + '/cookbook',
			preservePath : true
		}),
		inject : [ConfigService]
	})],
	controllers: [CookbookController, LikeController, CommentController],
	providers: [CookbookService, { provide: COOKBOOK_REPOSITORY, useClass: CookbookRepository }, 
				LikeService, { provide: LIKE_REPOSITORY, useClass: LikeRepository }, 
				CommentService, { provide: COMMENT_REPOSITORY, useClass: CommentRepository }]
})
export class CookbookModule {}
