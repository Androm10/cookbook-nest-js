import { Controller, Param, Get, Post, Body, Put, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('cookbookComment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.commentService.getById(id);
    }

    @Get('/all/:cookbookId')
    async getAll(@Param('cookbookId', ParseIntPipe) cookbookId: number) {
        return this.commentService.getAll(cookbookId);
    }

    @Post('/:cookbookId')
    @UseGuards(AuthGuard('jwt'))
    async create(@Param('cookbookId', ParseIntPipe) cookbookId: number, @Body() createCommentDto: CreateCommentDto, @Req() req: any) {
        const comment = {
            text: createCommentDto.text,
            rate: createCommentDto.rate,
            cookbookId: cookbookId,
            userId: req.user.id,
            createdAt: Date.now()
        }

        return this.commentService.create(comment);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateById(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto, @Req() req: any) {
        return this.commentService.updateById(id, req.user.id, updateCommentDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteById(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
        return this.commentService.deleteById(id, req.user.id);
    }


}
