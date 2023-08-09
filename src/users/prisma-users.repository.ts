import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from 'src/repositories/users.repository';
import { User, Role } from './entities/user.entity';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }

  findAll(name: string, email: string, phone: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        active: true,
        name: { contains: name },
        email: { contains: email },
        phone: { contains: phone },
        role: Role.USER,
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

  update(id: string, user: User): Promise<User> {
    return this.prisma.user.update({
      data: user,
      where: { id },
    });
  }

  async delete(id: string): Promise<User> {
    const user = await this.findById(id);
    return this.update(id, { ...user, active: false });
  }
}
