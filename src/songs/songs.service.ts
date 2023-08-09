import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song, SongWithUrls } from './entities/song.entity';
import { SongsRepository } from 'src/repositories/songs.repository';
import { createSlug } from 'src/utils/slugUtil';

@Injectable()
export class SongsService {
  constructor(private repository: SongsRepository) {}

  create(createSongDto: CreateSongDto): Promise<Song> {
    const song: Song = new Song(createSongDto);
    const slug = createSlug(song.name);
    return this.repository.create({ ...song, slug });
  }

  findAll(name: string): Promise<Song[]> {
    return this.repository.findAll(name);
  }

  findBySlug(slug: string): Promise<Song> {
    try {
      return this.repository.findBySlug(slug);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  findById(id: string): Promise<Song> {
    try {
      return this.repository.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  findByIdWithUrls(id: string): Promise<SongWithUrls> {
    try {
      return this.repository.findByIdWithUrls(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    const song = await this.findById(id);
    const updatedSong: Song = {
      id,
      slug: song.slug,
      name: updateSongDto.name,
      style: updateSongDto.style,
      tonality: updateSongDto.tonality,
      duration: updateSongDto.duration,
      youtubeCode: updateSongDto.youtubeCode,
      active: true,
    };
    return this.repository.update(id, updatedSong);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
