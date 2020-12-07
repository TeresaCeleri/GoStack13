import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  //coluna do banco de dados mesmo
  @Column()
  user_id: string;

  //relacionamento para tabelas e colunas
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
