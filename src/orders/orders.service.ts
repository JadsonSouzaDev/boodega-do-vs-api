import { Injectable } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';
import { OrdersRepository } from 'src/repositories/order.repository';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { OrderResponseDto } from './dto/response/order-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly repository: OrdersRepository,
    private readonly userService: UsersService,
  ) {}

  async create(
    createOrderDto: CreateOrderRequestDto,
    user: User,
  ): Promise<OrderResponseDto> {
    const userSaved = await this.userService.findByEmailAdmin(user.email);
    const orderSaved = await this.repository.create(
      createOrderDto.toEntity(userSaved),
    );
    return new OrderResponseDto(orderSaved);
  }

  async findAll(user: User): Promise<OrderResponseDto[]> {
    const orders = await this.repository.findAll(user);
    return orders.map((order) => new OrderResponseDto(order));
  }

  async findOne(id: string, user: User): Promise<OrderResponseDto> {
    const orderSaved = await this.repository.findById(id, user);
    return new OrderResponseDto(orderSaved);
  }
}
