import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManageError } from 'src/common/errors/custom/error.custom';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role)
    private roleRepository:Repository<Role>
  ){}

  async create(createRoleDto: CreateRoleDto) {
    try{
      const role:Role= this.roleRepository.create(createRoleDto);
      
      await this.roleRepository.save(role);

      return role;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const role:Role[] | null=await this.roleRepository.find();
      if(role.length==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE DOES NOT ROLES"
        });
      }
      return role;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const role:Role | null=await this.roleRepository.findOneBy({id});
      if(!role){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE DOES NOT ROLE WITH THIS ID"
        });
      }
      return role;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }


  async findOneByName(name: string) {
    try{
      const role:Role | null=await this.roleRepository.findOneBy({name});
      if(!role){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"THERE DOES NOT ROLE WITH THIS NAME"
        });
      }
      return role;
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try{
      const {affected}=await this.roleRepository.update(id,updateRoleDto);
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
      const {affected}=await this.roleRepository.delete(id);
      if(affected==0){
        throw new ManageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATED"
        });
      }
      return "Perfectly Deleted";
    }catch(err:any){
      throw ManageError.signedError(err.message);
    }
  }
}
