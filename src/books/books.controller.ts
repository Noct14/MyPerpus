import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Render,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { AuthorsService } from '../authors/authors.service';
import type { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(
    private service: BooksService,
    private authorsService: AuthorsService,
  ) {}

  // LIST
  @Get()
  @Render('books/index')
  async findAll(
    @Query('search') search?: string,
    @Query('page') page?: string,
  ) {
    const currentPage = Math.max(parseInt(page ?? '1', 10) || 1, 1);
    const limit = 10;

    const { data, total, totalPages } = await this.service.findAll(
      search,
      currentPage,
      limit,
    );

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return {
      books: data,
      search,
      page: currentPage,
      total,
      totalPages,
      hasPrev,
      hasNext,
      prevPage: hasPrev ? currentPage - 1 : 1,
      nextPage: hasNext ? currentPage + 1 : totalPages,
      showPagination: totalPages > 1,
    };
  }

  // CREATE PAGE
  @Get('create')
  @Render('books/create')
  async showCreate() {
    const authors = await this.authorsService.findAll();
    return { authors };
  }

  // CREATE PROCESS
  @Post('create')
  async create(
    @Body() body: any,
    @Res() res: Response,
  ) {
    await this.service.create(
      body.title,
      +body.published_year,
      +body.author_id,
    );

    return res.redirect('/books');
  }

  @Get(':id')
  @Render('books/show')
  async show(@Param('id') id: string) {
    const book = await this.service.findOne(+id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return { book };
  }


  // EDIT PAGE
  @Get(':id/edit')
  @Render('books/edit')
  async showEdit(@Param('id') id: string) {
    const book = await this.service.findOne(+id);
    const authors = await this.authorsService.findAll();
    return { book, authors };
  }

  // UPDATE
  @Post(':id/edit')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ) {
    await this.service.update(
      +id,
      body.title,
      +body.published_year,
      +body.author_id,
    );

    return res.redirect('/books');
  }

  // DELETE
  @Get(':id/delete')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.service.delete(+id);
    return res.redirect('/books');
  }
}
