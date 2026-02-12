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

  async findAll(search?: string) {
    if (search) {
      return this.repo.find({
        where: {
          title: Like(`%${search}%`),
        },
        relations: ['author'],
      });
    }

    return this.repo.find({
      relations: ['author'],
    });
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
