import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { createBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('books')
export class BooksController {

    constructor(
        private booksService: BooksService
    ){}

    @Get()
    getBooks(){
        return this.booksService.getBooks()
    }
    @Post()
    @UseGuards(AuthGuard)
    createBook(@Body() book:createBookDto){
        return this.booksService.createBook(book);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseIntPipe) id:number){
        return this.booksService.deleteBook(id)
    }
}
