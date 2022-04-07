import { Controller, Param, Get, Post, Body, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard  } from '@nestjs/passport';
import { LikeService } from '../services/like.service';

@Controller('recipe/like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async like(@Param('id') id: string, @Req() req) {
        return this.likeService.like(+id, req.user.id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async unlike(@Param('id') id: string, @Req() req) {
        return this.likeService.unlike(+id, req.user.id);
    }


}
