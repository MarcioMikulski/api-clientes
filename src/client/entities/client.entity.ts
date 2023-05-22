import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  endereco: string;

  @Column()
  phone: string;
}
