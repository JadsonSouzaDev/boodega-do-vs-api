import { SongVersion } from 'src/song-versions/entities/song-version.entity';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/users/entities/user.entity';

export class SongOrder {
  song: Song;
  version: SongVersion;
}

export type PaymentStatus = 'pending' | 'refused' | 'approved';

export class Payment {
  id: string;
  status: PaymentStatus;
}

export class Order {
  id: string;
  songOrder: SongOrder[];
  payment: Payment;
  user: User;
}