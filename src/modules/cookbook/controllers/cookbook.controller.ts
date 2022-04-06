import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateCookbookDto } from '../dto/create-cookbook.dto';
import { UpdateCookbookDto } from '../dto/update-cookbook.dto';
import { CookbookService } from '../services/cookbook.service';

@Controller('cookbook')
export class CookbookController {
    constructor(private readonly cookbookService: CookbookService) {}

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getById(@Param('id') id: string) {
        return this.cookbookService.getById(+id);
    }

    @Get()
    async getAll() {
        return this.cookbookService.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Req() req, @Body() createCookbookDto: CreateCookbookDto) {
        return this.cookbookService.create({ creatorId: req.user.id, ...createCookbookDto });
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateCookbookDto: UpdateCookbookDto) {
        return this.cookbookService.updateById(+id, updateCookbookDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return this.cookbookService.deleteById(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/linkRecipe/:recipeId')
    async linkRecipe(@Param('id') cookbookId, @Param('recipeId') recipeId) {
        return this.cookbookService.linkRecipe(+cookbookId, +recipeId);
    } 

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/unlinkRecipe/:recipeId')
    async unlinkRecipe(@Param('id') cookbookId, @Param('recipeId') recipeId) {
        return this.cookbookService.unlinkRecipe(+cookbookId, +recipeId);
    } 


}
