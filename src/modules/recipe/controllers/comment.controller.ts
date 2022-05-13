import {
	Controller,
	Param,
	Get,
	Post,
	Body,
	Put,
	Delete,
	Req,
	ParseIntPipe,
} from '@nestjs/common';
import { Statuses } from 'src/middlewares/check-status.middleware';
import { NoAuth } from 'src/middlewares/no-auth.middleware';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('recipeComment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@Get(':id')
	@NoAuth()
	async getById(@Param('id', ParseIntPipe) id: number) {
		return this.commentService.getById(id);
	}

	@Get('all/:recipeId')
	@NoAuth()
	async getAll(@Param('recipeId', ParseIntPipe) recipeId: number) {
		return this.commentService.getAll(recipeId);
	}

	@Post(':recipeId')
	@Statuses('active')
	async create(
		@Param('recipeId', ParseIntPipe) recipeId: number,
		@Body() createCommentDto: CreateCommentDto,
		@Req() req: any,
	) {
		const comment = {
			text: createCommentDto.text,
			rate: createCommentDto.rate,
			recipeId: recipeId,
			userId: req.user.id,
			createdAt: Date.now(),
		};

		return this.commentService.create(comment);
	}

	@Put(':id')
	@Statuses('active')
	async updateById(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCommentDto: UpdateCommentDto,
		@Req() req: any,
	) {
		return this.commentService.updateById(
			id,
			req.user.id,
			updateCommentDto,
		);
	}

	@Delete(':id')
	@Statuses('active')
	async deleteById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
		return this.commentService.deleteById(id, req.user.id);
	}
}
