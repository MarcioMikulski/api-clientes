import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { Encrypt } from 'src/auth/encrypt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), Encrypt],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
