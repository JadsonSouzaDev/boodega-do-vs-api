import { Module } from '@nestjs/common';
import { SongVersionsService } from './song-versions.service';
import { SongVersionsController } from './song-versions.controller';
import { PrismaService } from 'src/database/prisma.service';
import { SongVersionsRepository } from 'src/repositories/songVersions.repository';
import { PrismaSongVersionsRepository } from './prisma-song-version.repository';

@Module({
  controllers: [SongVersionsController],
  providers: [
    SongVersionsService,
    PrismaService,
    { provide: SongVersionsRepository, useClass: PrismaSongVersionsRepository },
  ],
})
export class SongVersionsModule {}
