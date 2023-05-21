import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UserService } from 'src/users/users.service';
import { Encrypt } from './encrypt';

@Injectable()
export class AuthService {
  private readonly encrypt = new Encrypt();
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Usuário ou senha Invalidos');
  }
  async login(payload: User) {
    const user = await this.usersService.findOneByEmail(payload.email);
    const userMatch = await this.encrypt.compare(
      payload.password,
      user.password,
    );
    if (userMatch) {
      return {
        access_token: this.jwtService.sign({ email: payload.email }),
      };
    }
  }
}
