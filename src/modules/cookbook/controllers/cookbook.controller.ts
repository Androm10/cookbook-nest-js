import { Controller, Param, Get, Post, Body, Put, Delete, UseGuards, Req, Patch } from '@nestjs/common';
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
    
    async getById(@Param('id') id: string) {
        return this.cookbookService.getById(+id);
    }

    @Get()
    async getAll() {
        return this.cookbookService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() req, @Body() createCookbookDto: CreateCookbookDto) {
        return this.cookbookService.create({ creatorId: req.user.id, ...createCookbookDto });
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async updateById(@Param('id') id: string, @Body() updateCookbookDto: UpdateCookbookDto) {
        return this.cookbookService.updateById(+id, updateCookbookDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteById(@Param('id') id: string) {
        return this.cookbookService.deleteById(+id);
    }

    @Patch(':id/linkRecipe/:recipeId')
    @UseGuards(AuthGuard('jwt'))
    async linkRecipe(@Param('id') cookbookId, @Param('recipeId') recipeId) {
        return this.cookbookService.linkRecipe(+cookbookId, +recipeId);
    } 

    @Patch(':id/unlinkRecipe/:recipeId')
    @UseGuards(AuthGuard('jwt'))
    async unlinkRecipe(@Param('id') cookbookId, @Param('recipeId') recipeId) {
        return this.cookbookService.unlinkRecipe(+cookbookId, +recipeId);
    } 


}
