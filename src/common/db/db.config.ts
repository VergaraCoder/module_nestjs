import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Notification } from "src/notification/entities/notification.entity";
import { Reservation } from "src/reservations/entities/reservation.entity";
import { Role } from "src/role/entities/role.entity";
import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/user/entities/user.entity";



@Injectable()
export class Credentials implements TypeOrmOptionsFactory{

    constructor(
        private configService:ConfigService
    ){}

    createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return({
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [
              User,Role,Room,Reservation,Notification
            ],
            synchronize: true,
        });
    }
}