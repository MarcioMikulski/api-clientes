import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('tipo-usuario')
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;

  @OneToOne(() => User, (user) => user.tipo)
  @JoinColumn({ name: 'id', referencedColumnName: 'tipo' })
  user: User;
}
