import { Transform } from "class-transformer";
import { IsEmail, isEmail, IsString, isString, MinLength } from "class-validator"

export class CreateUserDto{
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    password: string;
}