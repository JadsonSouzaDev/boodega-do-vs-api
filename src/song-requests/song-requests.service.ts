import { Injectable } from '@nestjs/common';
import { CreateSongRequestDto } from './dto/create-song-request.dto';
import { UpdateSongRequestDto } from './dto/update-song-request.dto';

@Injectable()
export class SongRequestsService {
  create(createSongRequestDto: CreateSongRequestDto) {
    return 'This action adds a new songRequest';
  }

  findAll() {
    return `This action returns all songRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} songRequest`;
  }

  update(id: number, updateSongRequestDto: UpdateSongRequestDto) {
    return `This action updates a #${id} songRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} songRequest`;
  }
}
