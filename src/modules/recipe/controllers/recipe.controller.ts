import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { RecipeService } from '../services/recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.recipeService.getById(+id);
    }

    @Get()
    async getAll(@Query('limit', ParseIntPipe) limit: number, @Query('page', ParseIntPipe) page: number) {
        return this.recipeService.getAll(limit, page);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req, @Body() createRecipeDto: CreateRecipeDto) {
        
        return this.recipeService.create({creatorId: req.user.id, ...createRecipeDto});
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateById(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipeService.updateById(+id, updateRecipeDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteById(@Param('id') id: string) {
        return this.recipeService.deleteById(+id);
    }


}
