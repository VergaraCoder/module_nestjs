import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { ManageError } from 'src/common/errors/custom/error.custom';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private roleService:RoleService
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const role:Role=await this.roleService.findOneByName(createUserDto.roleName);

      delete createUserDto.roleName;

      const dataUser=this.userRepository.create
      ({roleId:role.id,...createUserDto});

      await this.userRepository.save(dataUser);

      return dataUser;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const users:User[] | null= await this.userRepository.find();
      if(users.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE ARE NOT USERS"
        });
      }
      return users;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const user:User | null= await this.userRepository.findOneBy({id});
      if(!user){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THIS ID NOT EXIST"
        });
      }
      return user;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const {affected}=await this.userRepository.update(id,updateUserDto);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Perfectly updated";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}=await this.userRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO DELETED"
        });
      }
      return "Perfectly deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
