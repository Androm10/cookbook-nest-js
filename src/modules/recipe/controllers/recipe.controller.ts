import { Controller, Param, Get, Post, Body, Put, Delete, Req, Query, ParseIntPipe } from '@nestjs/common';
import { Roles } from 'src/middlewares/check-roles.middleware';
import { Statuses } from 'src/middlewares/check-status.middleware';
import { NoAuth } from 'src/middlewares/no-auth.middleware';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { RecipeService } from '../services/recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':id')
    @NoAuth()
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.recipeService.getById(id);
    }

    @Get()
    @NoAuth()
    async getAll(@Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) page: number) {
        return this.recipeService.getAll(limit, page);
    }

    @Post()
    @Statuses('active')
    async create(@Req() req, @Body() createRecipeDto: CreateRecipeDto) {
        return this.recipeService.create({creatorId: req.user.id, ...createRecipeDto});
    }

    @Put(':id')
    @Statuses('active')
    async updateById(@Param('id', ParseIntPipe) id: number, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipeService.updateById(id, updateRecipeDto);
    }

    @Delete(':id')
    @Statuses('active')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        return this.recipeService.deleteById(id);
    }

    @Get('stats/count')
    @Roles('Admin')
    @Statuses('active')
    async countAll() {
        return this.recipeService.countAll();
    }   
    
    @Get('stats/:id/views')
    @Roles('Admin')
    @Statuses('active')
    async getViews(@Param('id', ParseIntPipe) id: number) {
        return this.recipeService.getViews(id);
    }

    @Get('stats/mostPopular')
    @Roles('Admin')
    @Statuses('active')
    async mostPopular() {
        return this.recipeService.mostPopular();
    }

}
