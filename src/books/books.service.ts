import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  async findAll(search?: string, page = 1, limit = 10) {
    const where = search
      ? {
          title: Like(`%${search}%`),
        }
      : {};

    const [items, total] = await this.repo.findAndCount({
      where,
      relations: ['author'],
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return {
      data: items,
      total,
      page,
      limit,
      totalPages,
    };
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  create(title: string, published_year: number, author_id: number) {
    const book = this.repo.create({
      title,
      published_year,
      author_id,
    });
    return this.repo.save(book);
  }

  update(id: number, title: string, published_year: number, author_id: number) {
    return this.repo.update(id, {
      title,
      published_year,
      author_id,
    });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
