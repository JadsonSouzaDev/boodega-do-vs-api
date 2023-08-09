import { Injectable } from '@nestjs/common';
import { SongVersionsRepository } from 'src/repositories/songVersions.repository';
import { SongVersion } from './entities/song-version.entity';

@Injectable()
export class SongVersionsService {
  constructor(private readonly repository: SongVersionsRepository) {}

  findAll(): Promise<SongVersion[]> {
    return this.repository.findAll();
  }
}
