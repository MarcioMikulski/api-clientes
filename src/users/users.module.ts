import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { Encrypt } from 'src/auth/encrypt';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({}), Encrypt],
  controllers: [UsersController],
  providers: [UserService, AuthService],
})
export class UsersModule {}
