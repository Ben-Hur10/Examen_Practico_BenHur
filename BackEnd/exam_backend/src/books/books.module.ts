import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Book]),
    UsersModule,
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
