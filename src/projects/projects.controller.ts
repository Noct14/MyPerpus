import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Render,
  Res,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import type { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  // ================= LIST =================
  @Get()
  @Render('projects/index')
  async findAll(@Query('search') search?: string) {
    const projects = await this.service.findAll(search);
    return { projects, search };
  }

  // ================= CREATE PAGE =================
  @Get('create')
  @Render('projects/create')
  showCreate() {
    return {};
  }

  // ================= CREATE PROCESS =================
  @Post('create')
  async create(
    @Body('name') name: string,
    @Res() res: Response,
  ) {
    await this.service.create(name);
    return res.redirect('/projects');
  }

  // ================= EDIT PAGE =================
  @Get(':id/edit')
  @Render('projects/edit')
  async showEdit(@Param('id') id: string) {
    const project = await this.service.findOne(+id);
    return { project };
  }

  // ================= UPDATE =================
  @Post(':id/edit')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Res() res: Response,
  ) {
    await this.service.update(+id, name);
    return res.redirect('/projects');
  }

  // ================= DELETE =================
  @Get(':id/delete')
  async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.service.delete(+id);
    return res.redirect('/projects');
  }
}
