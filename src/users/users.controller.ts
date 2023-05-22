import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { User } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    if (id) {
      return await this.userService.findOne(id);
    } else {
      throw new BadRequestException(' invalid id parameter');
    }
  }

  @Post()
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() update: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, update);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
