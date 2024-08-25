import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'examdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),UsersModule, BooksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}