import {
	Controller,
	Param,
	Get,
	Delete,
	Req,
	ParseIntPipe,
} from '@nestjs/common';
import { Statuses } from 'src/middlewares/check-status.middleware';
import { LikeService } from '../services/like.service';

@Controller('recipe/like')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@Get(':id')
	@Statuses('active')
	async like(@Param('id', ParseIntPipe) id: number, @Req() req) {
		return this.likeService.like(id, req.user.id);
	}

	@Delete(':id')
	@Statuses('active')
	async unlike(@Param('id', ParseIntPipe) id: number, @Req() req) {
		return this.likeService.unlike(id, req.user.id);
	}
}
