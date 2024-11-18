import { Injectable } from "@nestjs/common";
import { CreateReservationDto } from "../dto/create-reservation.dto";
import { ManageError } from "src/common/errors/custom/error.custom";
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "../entities/reservation.entity";
import { Repository } from "typeorm";


@Injectable()
export class FilterData{
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository:Repository<Reservation>
    ){}

    async FilterToCreate(data:CreateReservationDto){
        try{
            if(data.minutesReservation>60){
               throw new ManageError({
                type:"CONFLICT",
                message:"NO PUEDES RESERVAR MAS DE UNA HORA"
               });
            }
            const date:Date= new Date(data.dateReservation);

            const creationOrderDate:Date=new Date(data.orderCreationDate);

            const operation:number=date.getTime() - creationOrderDate.getTime();

            if(operation<= 900000){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"NO PUEDES HACER UNA RESERVA 15 MINUTOS ANTES, LA PROXIMA HAZLO CON MAS PLAZO"
                });
            }

            return true;

        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }


    async FilterToDelete(id:number){
        try{
            const findOne=await this.reservationRepository.findOneBy({id});
            if(!findOne){
                throw new ManageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE NOT NOTHING RESERVATION"
                });
            }
            const date:Date=new Date();
            const dateReservation:Date= new Date(findOne.dateReservation);

            const operation:number= dateReservation.getTime() - date.getTime();

            if(operation>= 3600000){
                throw new ManageError({
                    type:"CONFLICT",
                    message:"NO PUEDES CANCELAR LA RESERVA UNA HORA O MENOS DE LA QUE LA RESERVASTE"
                });
            }
            return findOne;

        }catch(err:any){
            throw ManageError.signedError(err.message);
        }
    }
}