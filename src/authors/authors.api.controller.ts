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
import { AuthorsService } from './authors.service';

@Controller('api/authors')
export class AuthorsApiController {
  constructor(private readonly service: AuthorsService) {}

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const author = await this.service.findOne(+id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  @Post()
  async create(@Body() body: any) {
    return this.service.create(body.name, body.bio);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    await this.service.update(+id, body.name, body.bio);
    return { message: 'Author updated successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.service.delete(+id);
    return { message: 'Author deleted successfully' };
  }
}
