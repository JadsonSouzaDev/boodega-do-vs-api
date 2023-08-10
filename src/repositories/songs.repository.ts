import { Song } from 'src/songs/entities/song.entity';

export abstract class SongsRepository {
  abstract create(song: Song): Promise<Song>;
  abstract findAll(name: string): Promise<Song[]>;
  abstract findBySlug(slug: string): Promise<Song>;
  abstract findById(id: string): Promise<Song>;
  abstract update(id: string, song: Song): Promise<Song>;
  abstract delete(id: string): Promise<Song>;
}
