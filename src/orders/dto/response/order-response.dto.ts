import { PaymentResponseDto } from 'src/payments/dto/response/payment-response.dto';
import { Order, SongOrder } from 'src/orders/entities/order.entity';
import { SongResponseDto } from 'src/songs/dto/response/song-response.dto';
import { SongVersion } from 'src/song-versions/entities/song-version.entity';

export class SongOrderResponseDto {
  constructor(songOrder: SongOrder) {
    this.id = songOrder.id;
    this.song = new SongResponseDto(songOrder.song);
    this.version = songOrder.version;
  }

  id: string;
  song: SongResponseDto;
  version: SongVersion;
}

export class OrderResponseDto {
  constructor(order: Order) {
    this.id = order.id;
    this.payment = new PaymentResponseDto(order.payment);
    this.songsOrder = order.songsOrder.map(
      (songOrder) => new SongOrderResponseDto(songOrder),
    );
  }

  id: string;
  songsOrder: SongOrderResponseDto[];
  payment: PaymentResponseDto;
}
