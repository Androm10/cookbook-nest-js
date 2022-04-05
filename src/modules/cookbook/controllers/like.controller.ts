import { Controller, Param, Get, Post, Body, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard  } from '@nestjs/passport';
import { LikeService } from '../services/like.service';

@Controller('cookbook/like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async like(@Param('id') id: string, @Req() req) {
        return this.likeService.like(+id, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async unlike(@Param('id') id: string, @Req() req) {
        return this.likeService.unlike(+id, req.user.id);
    }


}
