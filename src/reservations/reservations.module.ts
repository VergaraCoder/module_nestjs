import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { UserModule } from 'src/user/user.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { FilterData } from './filterData/filterData';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Reservation]),
    UserModule,
    RoomsModule,
    NotificationModule
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    FilterData
  ],
  exports:[
    TypeOrmModule
  ]
})
export class ReservationsModule {}
