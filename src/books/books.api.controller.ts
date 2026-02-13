import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksApiController {
  constructor(private readonly service: BooksService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.service.findOne(+id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  @Post()
  async create(@Body() body: any) {
    return this.service.create(
      body.title,
      +body.published_year,
      +body.author_id,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.service.update(
      +id,
      body.title,
      +body.published_year,
      +body.author_id,
    );

    return { message: 'Book updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.delete(+id);
    return { message: 'Book deleted successfully' };
  }
}
