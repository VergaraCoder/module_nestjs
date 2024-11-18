import { Reservation } from "src/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rooms")
export class Room {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    location:string;
    
    @Column()
    description:string;

    @Column()
    capacity:number;

    @Column()
    available:boolean;

    @Column()
    price:number;

    @OneToMany(()=>Reservation,reservation=>reservation.room)
    reservation:Reservation[];
}
