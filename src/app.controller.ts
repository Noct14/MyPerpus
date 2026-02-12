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
  async home(@Query('search') search?: string) {
    const books = await this.booksService.findAll(search);

    return {
      layout: 'layout',
      title: 'Dashboard',
      active: 'dashboard',
      books,
      search,
    };
  }
}
