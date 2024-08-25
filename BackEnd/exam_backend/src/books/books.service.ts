import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { createBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {

    constructor( 
        @InjectRepository(Book) private bookRepository:Repository<Book>,
        private UsersService: UsersService){}

    async createBook(book:createBookDto){
        const userFoundOrException  = await this.UsersService.getUser(book.userId);        

        const existingBook = await this.bookRepository.findOne({ where: { isbn: book.isbn } });
        if (existingBook) {
            throw new BadRequestException('Book with this ISBN already exists');
        }
        if (userFoundOrException instanceof HttpException) {
            return userFoundOrException;
        }
        const newBook = this.bookRepository.create(book);
        return this.bookRepository.save(newBook);
    }

    async getBooks(){
        return await this.bookRepository
        .createQueryBuilder('book')
        .leftJoinAndSelect('book.user', 'user')
        .select([
            'book.id', 
            'book.title', 
            'book.author', 
            'book.isbn', 
            'book.release_date',
            'user.name'
        ])
        .getMany();
    }

    async deleteBook(id:number){
        const result = await this.bookRepository.delete({id})
        if(result.affected === 0){
            return new HttpException('Book not found', HttpStatus.NOT_FOUND)
        }
        return true
    }
}
