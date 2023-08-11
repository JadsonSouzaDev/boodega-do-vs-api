import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';

export abstract class OrdersRepository {
  abstract create(order: Order): Promise<Order>;
  abstract findAll(user: User): Promise<Order[]>;
  abstract findById(id: string, user: User): Promise<Order>;
}
