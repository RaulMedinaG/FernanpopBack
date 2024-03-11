import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email:string

    @Transform(({value}) => value.trim())
    @IsString()
    name: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}