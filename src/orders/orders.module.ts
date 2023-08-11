import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from 'src/database/prisma.service';
import { OrdersRepository } from 'src/repositories/order.repository';
import { PrismaOrdersRepository } from './prisma-orders.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    { provide: OrdersRepository, useClass: PrismaOrdersRepository },
  ],
})
export class OrdersModule {}
