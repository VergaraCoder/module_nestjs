import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/errors/custom/error.custom';

@Injectable()
export class RoomsService {

  constructor(
    @InjectRepository(Room)
    private roomRepository:Repository<Room>
  ){}

  async create(createRoomDto: CreateRoomDto) {
    try{
      const dataRoom=this.roomRepository.create(createRoomDto);

      await this.roomRepository.save(dataRoom);

      return dataRoom;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findAll() {
    try{
      const rooms:Room[]=await this.roomRepository.find();
      if(rooms.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT ROOMS"
        });
      }
      return rooms;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const room:Room=await this.roomRepository.findOneBy({id});
      if(!room){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT ROOM"
        });
      }
      return room;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try{
      const {affected}=await this.roomRepository.update(id,updateRoomDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS ROOM ID NOT EXIST"
        });
      }
      return "Perfectly Updated";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.roomRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETE"
        });
      }
      return "Perfectly Dleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
