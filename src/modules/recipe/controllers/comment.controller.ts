import { Controller, Param, Get, Post, Body, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('recipeComment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.commentService.getById(+id);
    }

    @Get('/all/:recipeId')
    async getAll(@Param('recipeId') recipeId: string) {
        return this.commentService.getAll(+recipeId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/:recipeId')
    async create(@Param('recipeId') recipeId: string, @Body() createCommentDto: CreateCommentDto, @Req() req: any) {
        const comment = {
            text: createCommentDto.text,
            rate: createCommentDto.rate,
            recipeId: recipeId,
            userId: req.user.id,
            createdAt: Date.now()
        }

        return this.commentService.create(comment);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req: any) {
        return this.commentService.updateById(+id, req.user.id, updateCommentDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteById(@Param('id') id: string, @Req() req: any) {
        return this.commentService.deleteById(+id, req.user.id);
    }


}
