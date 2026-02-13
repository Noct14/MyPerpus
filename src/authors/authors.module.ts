import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors.entity';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorsApiController } from './authors.api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController, AuthorsApiController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
