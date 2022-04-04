import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
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
    async getAll() {
        return this.recipeService.getAll();
    }

    @Post()
    async create(@Body() createRecipeDto: CreateRecipeDto) {
        return this.recipeService.create(createRecipeDto);
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
        return this.recipeService.updateById(+id, updateRecipeDto);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return this.recipeService.deleteById(+id);
    }


}
