import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { Order, SongOrder } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateSongOrderDto {
  @IsNotEmpty()
  songId: string;
  @IsNotEmpty()
  songVersionId: string;
}

export class CreateOrderRequestDto {
  @ArrayNotEmpty()
  songsOrder: CreateSongOrderDto[];

  @Transform(() => Order)
  toEntity(user: User): Order {
    return {
      id: undefined,
      active: true,
      payment: undefined,
      user,
      songsOrder: this.songsOrder.map((songOrder) => {
        return {
          id: undefined,
          songId: songOrder.songId,
          song: undefined,
          songVersionId: songOrder.songVersionId,
          version: undefined,
        };
      }),
    };
  }
}
