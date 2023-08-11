import { Payment } from '@prisma/client';
import { SongVersion } from 'src/song-versions/entities/song-version.entity';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/users/entities/user.entity';

export class SongOrder {
  id: string;
  song: Song;
  songId: string;
  version: SongVersion;
  songVersionId: string;
}

export class Order {
  id: string;
  songsOrder: SongOrder[];
  payment: Payment;
  user: User;
  active: boolean;
}
