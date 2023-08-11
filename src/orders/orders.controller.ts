import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from './dto/request/create-order-request.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDto: CreateOrderRequestDto,
    @Req() request: { user: User },
  ) {
    return this.ordersService.create(createOrderDto, request.user);
  }

  @Get()
  findAll(@Req() request: { user: User }) {
    return this.ordersService.findAll(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: { user: User }) {
    return this.ordersService.findOne(id, request.user);
  }
}
