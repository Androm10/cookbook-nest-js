import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/middlewares/CheckRoles/Decorator';
import { CheckRoles } from 'src/middlewares/CheckRoles/Guard';
import { CreateCookbookDto } from '../dto/create-cookbook.dto';
import { UpdateCookbookDto } from '../dto/update-cookbook.dto';
import { CookbookService } from '../services/cookbook.service';

@Controller('cookbook')
export class CookbookController {
    constructor(private readonly cookbookService: CookbookService) {}

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.cookbookService.getById(id);
    }

    @Get()
    async getAll(@Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) page: number) {
        return this.cookbookService.getAll(limit, page);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req, @Body() createCookbookDto: CreateCookbookDto) {
        return this.cookbookService.create({ creatorId: req.user.id, ...createCookbookDto });
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateById(@Param('id', ParseIntPipe) id: number, @Body() updateCookbookDto: UpdateCookbookDto) {
        return this.cookbookService.updateById(id, updateCookbookDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.cookbookService.deleteById(id);
    }

    @Patch(':id/linkRecipe/:recipeId')
    @UseGuards(AuthGuard('jwt'))
    async linkRecipe(@Param('id', ParseIntPipe) cookbookId: number, @Param('recipeId', ParseIntPipe) recipeId: number) {
        return this.cookbookService.linkRecipe(cookbookId, recipeId);
    } 

    @Patch(':id/unlinkRecipe/:recipeId')
    @UseGuards(AuthGuard('jwt'))
    async unlinkRecipe(@Param('id', ParseIntPipe) cookbookId: number, @Param('recipeId', ParseIntPipe) recipeId: number) {
        return this.cookbookService.unlinkRecipe(cookbookId, recipeId);
    } 
    
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async cloneCookbook(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.cookbookService.cloneCookbook(id, req.user.id);
    }
    
    @Get('stats/count')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async countAll() {
        return this.cookbookService.countAll();
    }   
    
    @Get('stats/:id/views')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async getViews(@Param('id') id: number) {
        return this.cookbookService.getViews(id);
    }

    @Get('stats/mostPopular')
    @UseGuards(AuthGuard('jwt'), CheckRoles)
    @Roles('Admin')
    async mostPopular() {
        return this.cookbookService.mostPopular();
    }

}
