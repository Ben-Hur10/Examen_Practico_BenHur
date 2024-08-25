import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    register(@Body() registerUser:CreateUserDto){
        return this.authService.register(registerUser);
    }

    @Post('login')
    login(@Body() loginUserDto:LoginUserDto){
        return this.authService.login(loginUserDto);
    }

    // @Get('profile')
    // @UseGuards(AuthGuard)
    // profile(
    //     @Request()
    //     req,
    // ){
    //     return req.user;
    // }

}
