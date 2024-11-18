import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({example:"jhonatan"})
    @IsOptional()
    @IsString()
    name?:string;

    @ApiProperty({example:"jhonatan@gmail.com"})
    @IsOptional()
    @IsEmail()
    email?:string;

    @ApiProperty({example:"jhonatan123"})
    @IsOptional()
    @IsString()
    password?:string;


    @ApiProperty(
    {
        example:"admin",
        description:"los posibles valores para esta propiedad son admin o client"
    })
    @IsOptional()
    @IsString()
    roleName?:string;
}
