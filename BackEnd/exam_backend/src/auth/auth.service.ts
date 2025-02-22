import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor (
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}
    
    async register({name, email, password }:CreateUserDto){
        const user = await this.userService.findOneByEmail(email);
        if(user){
            throw new BadRequestException('User already exists');
        }
        return await this.userService.createUser({
            name,
            email,
            password: await bcryptjs.hash(password, 10),
        });
    }

    async login({email, password}:LoginUserDto){

        const user = await this.userService.findOneByEmail(email)
        if(!user){
            throw new UnauthorizedException('Email is wrong')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is wrong')
        }

        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload)
        return{
            token,
            email,
        }
    }
}
