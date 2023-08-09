import { SongVersion } from 'src/song-versions/entities/song-version.entity';

export abstract class SongVersionsRepository {
  abstract findAll(): Promise<SongVersion[]>;
}
