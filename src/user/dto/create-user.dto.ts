import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example:"jhonatan"})
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({example:"jhonatan@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @ApiProperty({example:"jhonatan123"})
    @IsNotEmpty()
    @IsString()
    password:string;


    @ApiProperty(
    {
        example:"admin",
        description:"los posibles valores para esta propiedad son admin o client"
    })
    @IsNotEmpty()
    @IsString()
    roleName:string;

}
