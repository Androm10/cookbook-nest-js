import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
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
    async create(@Body() createCookbookDto: CreateCookbookDto) {
        return this.cookbookService.create(createCookbookDto);
    }

    @Put(':id')
    async updateById(@Param('id') id: string, @Body() updateCookbookDto: UpdateCookbookDto) {
        return this.cookbookService.updateById(+id, updateCookbookDto);
    }

    @Delete(':id')
    async deleteById(@Param('id') id: string) {
        return this.cookbookService.deleteById(+id);
    }


}
