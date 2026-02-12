import { 
  Module, 
  MiddlewareConsumer, 
  NestModule 
} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

import { Book } from './books/books.entity';
import { BooksModule } from './books/books.module';

import { Author } from './authors/authors.entity';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_mvc',
      entities: [User, Author, Book],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    AuthorsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
