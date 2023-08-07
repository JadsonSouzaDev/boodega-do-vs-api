import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongRequestDto } from './dto/create-song-request.dto';
import { UpdateSongRequestDto } from './dto/update-song-request.dto';
import { SongRequestsRepository } from 'src/repositories/songRequest.repository';
import { SongRequest } from './entities/song-request.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SongRequestsService {
  constructor(private repository: SongRequestsRepository) {}

  create(createSongRequestDto: CreateSongRequestDto, user: User) {
    const songRequest: SongRequest = new SongRequest(createSongRequestDto);
    return this.repository.create({ ...songRequest, userId: user.id });
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    try {
      return this.repository.findById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, { link, details }: UpdateSongRequestDto) {
    const savedRequest = await this.findOne(id);
    const updatedSongRequest = { ...savedRequest, link, details };
    return this.repository.update(id, updatedSongRequest);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
