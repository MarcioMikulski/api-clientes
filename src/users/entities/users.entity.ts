import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { TipoUsuario } from './tipo-usuario.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tipo: number;

  @OneToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.user)
  tipoUsuario: TipoUsuario;
}
