import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    provider: string;

    @Column('timestamp with local time zone')
    date: Date;
}

export default Appointment;
