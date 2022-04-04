import { Module } from '@nestjs/common';
import { CookbookController } from './controllers/cookbook.controller';
import { CookbookRepository } from './repositories/cookbook.repository';
import { CookbookService } from './services/cookbook.service';

@Module({
	controllers: [CookbookController],
	providers: [CookbookService, CookbookRepository]
})
export class CookbookModule {}
