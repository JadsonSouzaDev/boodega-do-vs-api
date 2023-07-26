import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { PrismaUsersRepository } from './prisma-users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UsersService],
})
export class UsersModule {}
