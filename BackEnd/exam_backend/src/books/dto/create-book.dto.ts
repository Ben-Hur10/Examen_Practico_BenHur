import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class createBookDto{
    
    @IsString()
    title:string;

    @IsString()
    author:string;

    @IsString()
    isbn:string;

    @IsDate()
    @Type(() => Date)
    release_date: Date;

    @IsNumber()
    userId:number;
}