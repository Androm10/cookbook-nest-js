import { Controller, Param, Get, Post, Body, Put, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard  } from '@nestjs/passport';
import { LikeService } from '../services/like.service';

@Controller('recipe/like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async like(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.likeService.like(id, req.user.id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async unlike(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.likeService.unlike(id, req.user.id);
    }


}
