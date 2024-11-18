import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { FilterData } from './filterData/filterData';
import { RoomsService } from 'src/rooms/rooms.service';
import { ManageError } from 'src/common/errors/custom/error.custom';
import { NotificationGateway } from 'src/notification/notification.gateway';
import { Room } from 'src/rooms/entities/room.entity';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private reservationRepository:Repository<Reservation>,
    private filterData:FilterData,
    private roomService:RoomsService,
    private webSocketClient:NotificationGateway
  ){}

  async create(createReservationDto: CreateReservationDto) {
    try{
      await this.filterData.FilterToCreate(createReservationDto);

      const dataReservation:Reservation=this.reservationRepository.create(createReservationDto);

      await this.reservationRepository.save(dataReservation);

      await this.roomService.update(createReservationDto.roomId,{available:false});

      return dataReservation;

    }catch(err:any){
      console.log(err);
           
      if(err.driverError && err.driverError.code=='ER_DUP_ENTRY'){
        throw new ManageError({
          type:"CONFLICT",
          message:"YA LA HABITACION ESTA RESERVADA"
        });
      }
      throw ManageError.signedError(err.message);

    }
  }

  async findAll() {
    try{
      const reservations:Reservation[]=await this.reservationRepository.find();
      if(reservations.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT RESERVATIONS"
        });
      }
      return reservations;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const reservation:Reservation=await this.reservationRepository.findOneBy({id});
      if(!reservation){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE IS NOT THAT RESERVATION"
        });
      }
      return reservation;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    try{
      const {affected}=await this.reservationRepository.update(id,updateReservationDto);

      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "PERFECT";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const dataRoom:Reservation=await this.filterData.FilterToDelete(id);
      
      const {affected}=await this.reservationRepository.delete(id);

      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE"
        });
      }

      await this.roomService.update(dataRoom.room.id,{available:true});

      this.webSocketClient.update(dataRoom.room);
      return "PERFECT";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
