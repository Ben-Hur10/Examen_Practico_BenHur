import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { User } from './user.entity';
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) 
    private userRepository: Repository<User>){}

    async createUser(user: CreateUserDto){
        const newUser = this.userRepository.create(user)
        this.userRepository.save(newUser)
        return true
    }

    getUsers(){
        return this.userRepository.find()
    }

    async findOneByEmail(email:string){
        return this.userRepository.findOneBy({email})
    }

    async getUser(id:number){
        const userFound = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return userFound;
    }
    
    async deleteUser(id:number){
        const result = await this.userRepository.delete({id})

        if(result.affected === 0){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return result
    }

    async updateUser(id:number, user:UpdateUserDto){
        const userFound = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

       return this.userRepository.update({id}, user)   
    }
}
