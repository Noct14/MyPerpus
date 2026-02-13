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
import { AuthorsService } from './authors.service';
import type { Response } from 'express';

@Controller('authors')
export class AuthorsController {
  constructor(private service: AuthorsService) {}

  // LIST
  @Get()
  @Render('authors/index')
  async findAll(@Query('search') search?: string) {
    const authors = await this.service.findAll(search);
    return { authors, search, active: 'authors',};
  }

  // CREATE PAGE
  @Get('create')
  @Render('authors/create')
  showCreate() {
    return {};
  }

  // CREATE PROCESS
  @Post('create')
  async create(
    @Body('name') name: string,
    @Body('bio') bio: string,
    @Res() res: Response,
  ) {
    await this.service.create(name, bio);
    return res.redirect('/authors');
  }

  @Get(':id')
  @Render('authors/show')
  async show(@Param('id') id: string) {
    const author = await this.service.findOne(+id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return {
      author,
      active: 'authors',
    };
  }

  // EDIT PAGE
  @Get(':id/edit')
  @Render('authors/edit')
  async showEdit(@Param('id') id: string) {
    const author = await this.service.findOne(+id);
    return { author };
  }

  // UPDATE
  @Post(':id/edit')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('bio') bio: string,
    @Res() res: Response,
  ) {
    await this.service.update(+id, name, bio);
    return res.redirect('/authors');
  }

  // DELETE
  @Get(':id/delete')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.service.delete(+id);
    return res.redirect('/authors');
  }
}
