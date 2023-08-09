import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { SongVersionsRepository } from 'src/repositories/songVersions.repository';
import { SongVersion } from './entities/song-version.entity';

@Injectable()
export class PrismaSongVersionsRepository implements SongVersionsRepository {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<SongVersion[]> {
    return this.prisma.songVersion.findMany();
  }
}
