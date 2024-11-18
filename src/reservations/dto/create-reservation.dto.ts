import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateReservationDto {

    @ApiProperty({example:1})
    @IsNotEmpty()
    @IsNumber()
    userId:number;

    
    @ApiProperty({example:1})
    @IsNotEmpty()
    @IsNumber()
    roomId:number;


    @ApiProperty({
        example:"2024-11-15T14:30",
        description: 'dateReservation debe incluir la fecha en formato ISO con horas y minutos (AAAA-MM-DDTHH:mm)'
    })
    @IsNotEmpty()
    @IsString()
    @Matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
      { message: 'dateReservation debe incluir la fecha en formato ISO con horas y minutos (AAAA-MM-DDTHH:mm)' }
    )
    dateReservation: string; 


    @IsNotEmpty()
    @IsString()
    @Matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
      { message: 'dateReservation debe incluir la fecha en formato ISO con horas y minutos (AAAA-MM-DDTHH:mm)' }
    )
    orderCreationDate: string; 

    @ApiProperty({example:60})
    @IsNotEmpty()
    @IsNumber()
    minutesReservation:number;
}
