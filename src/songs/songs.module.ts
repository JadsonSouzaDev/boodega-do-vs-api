import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { PrismaService } from 'src/database/prisma.service';
import { SongsRepository } from 'src/repositories/songs.repository';
import { PrismaSongsRepository } from './prisma-songs.repository';

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    PrismaService,
    { provide: SongsRepository, useClass: PrismaSongsRepository },
  ],
})
export class SongsModule {}
