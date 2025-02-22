import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id:number){
        return this.usersService.getUser(id);
    }

    @Get('/email/:email')
    getUserByEmail(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }

    @Post('')
    createUser(@Body() newUser: CreateUserDto){
       return this.usersService.createUser(newUser)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id:number){
        return this.usersService.deleteUser(id)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id:number, @Body() user:UpdateUserDto){
        return this.usersService.updateUser(id,user)
    }


}
