import { IsNumber, IsString, isString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    category: string;

    @IsNumber()
    price: number;

    @IsString()
    image: string;

    @IsString()
    email_Usuario: string;
}
