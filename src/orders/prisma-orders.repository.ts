import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/repositories/order.repository';
import { Order } from './entities/order.entity';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  include = {
    payment: true,
    user: true,
    songsOrder: {
      include: {
        order: false,
        song: { include: { urlsDownload: { include: { version: true } } } },
        version: true,
      },
    },
  };

  create(order: Order): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...order,
        user: { connect: { id: order.user.id } },
        payment: undefined,
        songsOrder: { createMany: { data: order.songsOrder } },
      },
      include: this.include,
    });
  }

  findAll(user: User): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { active: true, userId: user.id },
      include: this.include,
    });
  }

  findById(id: string, user: User): Promise<Order> {
    return this.prisma.order.findFirstOrThrow({
      where: { id, active: true, userId: user.id },
      include: this.include,
    });
  }
}
