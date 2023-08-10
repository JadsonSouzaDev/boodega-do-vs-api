import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongRequestDto } from './dto/request/create-song-request.dto';
import { UpdateRequestSongDto } from './dto/request/update-song-request.dto';
import { Song } from './entities/song.entity';
import { SongsRepository } from 'src/repositories/songs.repository';
import { createSlug } from 'src/utils/slugUtil';
import { SongResponseDto } from './dto/response/song-response.dto';

@Injectable()
export class SongsService {
  constructor(private repository: SongsRepository) {}

  async create(createSongDto: CreateSongRequestDto): Promise<SongResponseDto> {
    const slug = createSlug(createSongDto.name);
    const song = createSongDto.toEntity(slug);
    const songSaved = await this.repository.create({ ...song, slug });
    return new SongResponseDto(songSaved);
  }

  async findAll(name: string): Promise<SongResponseDto[]> {
    const songs = await this.repository.findAll(name);
    return songs.map((song) => new SongResponseDto(song));
  }

  mySongs(name: string): Promise<Song[]> {
    return this.repository.findAll(name);
  }

  async findBySlug(slug: string): Promise<SongResponseDto> {
    try {
      const song = await this.repository.findBySlug(slug);
      return new SongResponseDto(song);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findById(id: string): Promise<SongResponseDto> {
    try {
      const song = await this.repository.findById(id);
      return new SongResponseDto(song);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: string,
    updateSongDto: UpdateRequestSongDto,
  ): Promise<SongResponseDto> {
    try {
      const oldSong = await this.repository.findById(id);
      const updatedSong = updateSongDto.toEntity(oldSong);
      const songSaved = await this.repository.update(id, updatedSong);
      return new SongResponseDto(songSaved);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: string): Promise<SongResponseDto> {
    const song = await this.repository.delete(id);
    return new SongResponseDto(song);
  }

  getLinkDownload(id: string) {
    // id da relacao entre usuario, versao e musica
    // buscar musica pelo id
    // retornar url
    return id;
  }
}
