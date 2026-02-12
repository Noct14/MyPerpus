import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Author } from './authors.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private repo: Repository<Author>,
  ) {}

  async findAll(search?: string) {
    if (search) {
      return this.repo.find({
        where: {
          name: Like(`%${search}%`),
        },
      });
    }

    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(name: string, bio: string) {
    const author = this.repo.create({ name, bio });
    return this.repo.save(author);
  }

  update(id: number, name: string, bio: string) {
    return this.repo.update(id, { name, bio });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
