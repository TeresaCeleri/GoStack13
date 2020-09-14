import { 
    Entity,
    Column, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn
  } from "typeorm"

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: String;

    @Column()
    provider_id: string;

    @Column('timestamp with local time zone')
    date: Date;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Appointment;
