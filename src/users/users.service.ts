import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/users.entity';
import { UserDto } from './users.dto';
import { UpdateUserDto } from './updateUsers.dto';
import { Encrypt } from 'src/auth/encrypt';

@Injectable()
export class UserService {
  private encrypt = new Encrypt();
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(user: UserDto): Promise<User> {
    user.password = await this.encrypt.encrypt(user.password);
    return await this.repository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id: id } });
    if (user) {
      return user;
    } else {
      throw new BadRequestException(' invalid id parameter');
    }
  }

  async update(id: number, update: UpdateUserDto): Promise<User> {
    const user = await this.repository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      user.name = update.name;
      user.email = update.email;
      user.password = update.password;
      user.tipo = update.tipo;
      return await this.repository.save(user);
      console.log(user);
    }
  }

  /* async update(id: number, userDto: UserDto) {
    return await this.repository.update(id, userDto); 
  } */

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  async findOneByEmail(username: string): Promise<User> {
    return await this.repository.findOneBy({ email: username });
  }
}
