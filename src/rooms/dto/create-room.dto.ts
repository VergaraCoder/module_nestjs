import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @ApiProperty({
        example:"piso1",
        description:"Esta propiedad es para indicar el piso en el cual esta la habitacion"
    })
    @IsNotEmpty()
    @IsString()
    location:string;

    @ApiProperty({
        example:"Bella habitacion muy acogedora con aire acondicionado"
    })
    @IsNotEmpty()
    @IsString()
    description:string;


    @ApiProperty({
        example:3
    })
    @IsNotEmpty()
    @IsNumber()
    capacity:number;


    @ApiProperty({
        example:true,
        description:"Como apenas se va a crear debe estar en true para indicar que si esta disponible"
    })
    @IsNotEmpty()
    @IsBoolean()
    available:boolean;

    @ApiProperty({
        example:4000
    })
    @IsNotEmpty()
    @IsNumber()
    price:number;

}
