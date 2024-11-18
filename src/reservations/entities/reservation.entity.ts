import { Room } from "src/rooms/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("reservations")
@Unique(["roomId"])
export class Reservation {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:number;

    @Column()
    roomId:number;

    @Column()
    dateReservation:Date; //Fecha y hora a la que se desea hacer la reserva

    @Column()
    orderCreationDate:Date; // Fecha y hora que fueron hechas

    @Column()
    minutesReservation:number;

    @ManyToOne(()=>User,user=>user.reservation)
    user:User;

    @ManyToOne(()=>Room,room=>room.reservation,{eager:true})
    room:Room;

}
