import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { BooksService } from './books/books.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly booksService: BooksService,
  ) {}

  @Get()
  @Render('home')
  async home(
    @Query('search') search?: string,
    @Query('page') page?: string,
  ) {
    const currentPage = Math.max(parseInt(page ?? '1', 10) || 1, 1);
    const limit = 10;

    const { data, total, totalPages } = await this.booksService.findAll(
      search,
      currentPage,
      limit,
    );

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return {
      layout: 'layout',
      title: 'Dashboard',
      active: 'dashboard',
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
}
