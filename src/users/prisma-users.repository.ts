import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  findAll(name: string, email: string, phone: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        active: true,
        name: { contains: name },
        email: { contains: email },
        phone: { contains: phone },
      },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirstOrThrow({
      where: { email, active: true },
    });
  }

  findById(id: string): Promise<User> {
    return this.prisma.user.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: string, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      data: user,
      where: { id },
    });
  }

  delete(id: string): Promise<User> {
    const user = this.findById(id);
    return this.prisma.user.update({
      data: { ...user, active: false },
      where: { id },
    });
  }
}
