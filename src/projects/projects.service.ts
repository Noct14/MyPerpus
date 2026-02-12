import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repo: Repository<Project>,
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

  create(name: string) {
    const project = this.repo.create({ name });
    return this.repo.save(project);
  }

  update(id: number, name: string) {
    return this.repo.update(id, { name });
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
